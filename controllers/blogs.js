const router = require('express').Router();

const { Blog } = require('../models');

/** GET /api/blogs - List all blogs */
router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

/** POST /api/blogs - Add a new blog */
router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

/** DELETE /api/blogs/:id - Delete a blog */
router.delete('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    await blog.destroy();
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = router;
