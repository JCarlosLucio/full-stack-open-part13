const Blog = require('./blog');

Blog.sync(); // This creates the table if it doesn't exist (and does nothing if it already exists)

module.exports = {
  Blog,
};
