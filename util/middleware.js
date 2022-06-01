const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  if (error.name === 'SequelizeValidationError') {
    return res
      .status(400)
      .json({ error: error.errors.map((error) => error.message) });
  } else if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

module.exports = { errorHandler };
