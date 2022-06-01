const express = require('express');
require('express-async-errors');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const app = express();

const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');
const middleware = require('./util/middleware');

app.use(express.json());

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);

app.use(middleware.errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
