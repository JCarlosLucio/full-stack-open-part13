const router = require('express').Router();

const { ReadingList } = require('../models');

/** POST /api/readinglists - Add a Blog to the Readinglist*/
router.post('/', async (req, res) => {
  const { userId = null, blogId = null } = req.body;
  const readingList = await ReadingList.create({ userId, blogId });
  res.json(readingList);
});

module.exports = router;
