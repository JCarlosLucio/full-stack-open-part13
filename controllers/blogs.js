const router = require('express').Router();

const { Blog } = require('../models');

/** GET /api/blogs - List all blogs */
router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

/** POST /api/blogs - Add a new blog */
router.post('/', async (req, res) => {
  const blog = await Blog.create(req.body);
  res.json(blog);
});

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

/** DELETE /api/blogs/:id - Delete a blog */
router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy();
  }
  res.status(204).end();
});

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
