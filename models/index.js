const Blog = require('./blog');
const User = require('./user');

User.hasMany(Blog);
Blog.belongsTo(User);

Blog.sync({ alter: true }); // This creates the table if it doesn't exist (and does nothing if it already exists)
User.sync({ alter: true });

module.exports = {
  Blog,
  User,
};
