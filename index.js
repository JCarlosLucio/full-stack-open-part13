const express = require('express');
require('express-async-errors');
const authorRouter = require('./controllers/authors');
const blogRouter = require('./controllers/blogs');
const loginRouter = require('./controllers/login');
const userRouter = require('./controllers/users');
const readinglistsRouter = require('./controllers/reading_lists');

const app = express();

const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');
const middleware = require('./util/middleware');

app.use(express.json());

app.use('/api/authors', authorRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/readinglists', readinglistsRouter);

app.use(middleware.errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
