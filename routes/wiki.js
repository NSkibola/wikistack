const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
const { Sequelize } = require('Sequelize');
const { db, Page, Users } = require('../models');
const wikiPage = require('../views/wikipage');
const main = require('../views/main');

router.get('/', (req, res, next) => {
  const pages = Page.findAll();
  res.send(main(pages));
});

router.post('/', async (req, res, next) => {
  try {
    const title = req.body.title;
    const content = req.body.content;
    const page = await Page.create({
      title: title,
      content: content
    })
    await Page.sync();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }
  console.log(req.body);
}); 

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
  const page = await Page.findOne({
    where: {
      slug: req.params.slug
    }
  });
  res.send(wikiPage(page));
} catch(error) {
  console.log(error);
  res.status(404);
}
});

module.exports = router;