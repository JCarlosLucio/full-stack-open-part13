const bcrypt = require('bcrypt');
const router = require('express').Router();

const { User, Blog, ReadingList } = require('../models');

/** GET /api/users - List all users */
router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  });
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

/** GET /api/users/:id - Get a user */
/** GET /api/users/:id?read=true or false - Get a user with blogs in reading list that have been read or not read*/
router.get('/:id', async (req, res) => {
  const where = {};

  if (req.query.read) {
    where.read = req.query.read;
  }

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
    include: [
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
        through: {
          attributes: [],
        },
        include: [
          {
            model: ReadingList,
            attributes: ['read', 'id'],
            where,
          },
        ],
      },
    ],
  });
  res.json(user);
});

module.exports = router;
