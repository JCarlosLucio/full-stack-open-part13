const router = require('express').Router();
const { Session } = require('../models');
const { tokenExtractor } = require('../util/middleware');

/** DELETE /api/logout - Logout user - removes all user tokens from sessions*/
router.delete('/', tokenExtractor, async (req, res) => {
  await Session.destroy({ where: { userId: req.decodedToken.id } });
  res.status(204).end();
});

module.exports = router;
