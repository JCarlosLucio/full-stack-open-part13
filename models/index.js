const Blog = require('./blog');
const User = require('./user');
const ReadingList = require('./reading_list');
const Session = require('./session');

User.hasMany(Blog);
Blog.belongsTo(User);

/** the super many-to-many relationship
 * https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/#the-best-of-both-worlds--the-super-many-to-many-relationship
 */
User.belongsToMany(Blog, { through: ReadingList, as: 'readings' });
Blog.belongsToMany(User, { through: ReadingList });
User.hasMany(ReadingList);
ReadingList.belongsTo(User);
Blog.hasMany(ReadingList);
ReadingList.belongsTo(Blog);

User.hasMany(Session);
Session.belongsTo(User);

module.exports = {
  Blog,
  User,
  ReadingList,
  Session,
};
