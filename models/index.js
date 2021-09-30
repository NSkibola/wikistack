const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

function generateSlug (title) {
  // Removes all non-alphanumeric characters from title
  // And make whitespace underscore
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

const Page = db.define('page', {
  title: {type: Sequelize.STRING, allowNull: false, defaultValue: 'New Title'},
  slug: {type: Sequelize.STRING, allowNull: false},
  content: {type: Sequelize.STRING, allowNull: false},
  status: Sequelize.ENUM('open', 'closed')
}) 

Page.beforeValidate(async (page, options) => {
  const slug =  await generateSlug(page.title);
  page.slug = slug;
})


const Users = db.define('user', {
  name: {type: Sequelize.STRING, allowNull: false, defaultValue: 'New Name'},
  email:{type: Sequelize.STRING, allowNull: false, defaultValue: 'newemail@gmail.com', validate:{isEmail: true}}
})

module.exports = {
  db, Page, Users
}