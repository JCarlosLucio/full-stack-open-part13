const router = require('express').Router();
const { Op } = require('sequelize');

const { Blog, User } = require('../models');
const {
  tokenExtractor,
  blogFinder,
  userExtractor,
} = require('../util/middleware');

/** GET /api/blogs - List all blogs */
router.get('/', async (req, res) => {
  const where = {};

  if (req.query.search) {
    const searchFilter = { [Op.iLike]: `%${req.query.search}%` }; // case-insensitive filter
    // for using search filter in title or author
    where[Op.or] = [{ title: searchFilter }, { author: searchFilter }];
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
  });
  res.json(blogs);
});

/** POST /api/blogs - Add a new blog */
router.post('/', tokenExtractor, userExtractor, async (req, res) => {
  const blog = await Blog.create({ ...req.body, userId: req.user.id });
  res.json(blog);
});

/** DELETE /api/blogs/:id - Delete a blog */
router.delete(
  '/:id',
  blogFinder,
  tokenExtractor,
  userExtractor,
  async (req, res) => {
    if (req.user && req.blog && req.blog.userId === req.user.id) {
      await req.blog.destroy();
      res.status(204).end();
    } else {
      res.status(401).json({ error: 'unauthorized' });
    }
  }
);

/** PUT /api/blogs/:id - Update a blog number of likes*/
router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
