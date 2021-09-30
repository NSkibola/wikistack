const express = require('express');
const morgan = require('morgan');
const layout = require('./views/layout');
const { db, Page, Users } = require('./models');
const { Sequelize } = require('Sequelize');
const userrouter = require('./routes/users');
const wikirouter = require('./routes/wiki');
const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.use('/users', userrouter);
app.use('/wiki', wikirouter);

app.get("/", async (req, res) => {
  res.redirect("/wiki");
});

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

const PORT = 3000;
const init = async () => {
  await db.sync({force: true});
  // make sure that you have a PORT constant
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
}
init();