const bcrypt = require('bcrypt');
const router = require('express').Router();

const { User } = require('../models');

router.post('/', async (req, res) => {
  const body = req.body;

  const user = await User.unscoped().findOne({
    where: {
      username: body.username,
    },
  });

  const passwordCorrect = await bcrypt.compare(
    body.password,
    user.passwordHash
  );

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
});
