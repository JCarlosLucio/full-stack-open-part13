const Blog = require('./blog');
const User = require('./user');

Blog.sync(); // This creates the table if it doesn't exist (and does nothing if it already exists)
User.sync();

module.exports = {
  Blog,
  User,
};
