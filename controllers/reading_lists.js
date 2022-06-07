const router = require('express').Router();

const { ReadingList } = require('../models');
const { tokenExtractor, userExtractor } = require('../util/middleware');

/** POST /api/readinglists - Add a Blog to the Readinglist*/
router.post('/', async (req, res) => {
  const { userId = null, blogId = null } = req.body;
  const readingList = await ReadingList.create({ userId, blogId });
  res.json(readingList);
});

/** PUT /api/readinglists/:id - Mark a Blog as read*/
router.put('/:id', tokenExtractor, userExtractor, async (req, res) => {
  const readingList = await ReadingList.findByPk(req.params.id);
  if (req.user.id === readingList.userId) {
    readingList.read = req.body.read;
    await readingList.save();
    res.json(readingList);
  } else {
    res.status(401).json({ error: 'unauthorized' });
  }
});

module.exports = router;
