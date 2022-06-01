const bcrypt = require('bcrypt');
const router = require('express').Router();

const { User } = require('../models');

/** GET /api/users - List all users */
router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

/** POST /api/users - Create a user */
router.post('/', async (req, res) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await User.create({ username, name, passwordHash });
  res.json(user);
});

/** PUT /api/users/:username - Update user's username */
router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });

  if (user) {
    user.username = req.body.username;
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});

module.exports = router;