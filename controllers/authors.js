const router = require('express').Router();

const { Blog } = require('../models');
const { sequelize } = require('../util/db');

/** GET /api/authors - List all authors with number of articles(blogs) and number of likes*/
router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('*')), 'articles'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ],
    group: ['author'],
    order: [[sequelize.fn('SUM', sequelize.col('likes')), 'DESC']],
  });

  res.json(authors);
});

module.exports = router;
