const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { User, Session } = require('../models');
const { SECRET } = require('../util/config');

/** POST /api/login - Log in user */
router.post('/', async (req, res) => {
  const { username = null, password = null } = req.body;

  const user = await User.unscoped().findOne({
    where: {
      username,
    },
  });

  const passwordCorrect =
    user === null || password === null
      ? false
      : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  if (user.disabled) {
    return res.status(401).json({
      error: 'account disabled, please contact admin',
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  await Session.create({ token, userId: user.id });

  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = router;
