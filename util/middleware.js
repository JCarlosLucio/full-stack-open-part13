const jwt = require('jsonwebtoken');

const { User, Blog, Session } = require('../models');
const { SECRET } = require('./config');

const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  if (error.name === 'SequelizeValidationError') {
    return res
      .status(400)
      .json({ error: error.errors.map((error) => error.message) });
  } else if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'token invalid' });
  }
  next(error);
};

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);
    const session = await Session.findOne({ where: { token } });

    if (session) {
      req.decodedToken = jwt.verify(token, SECRET);
    } else {
      return res.status(401).json({ error: 'invalid token' });
    }
  } else {
    return res.status(401).json({ error: 'token missing' });
  }
  next();
};

const userExtractor = async (req, res, next) => {
  req.user = await User.findByPk(req.decodedToken.id);
  next();
};

module.exports = { errorHandler, blogFinder, tokenExtractor, userExtractor };
