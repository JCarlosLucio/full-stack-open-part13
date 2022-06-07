const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');

const { DATABASE_URL } = require('./config');

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const migrationsConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationsConf);
  const migrations = await migrator.up();
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
};

const rollbackMigration = async () => {
  try {
    await sequelize.authenticate();
    const migrator = new Umzug(migrationsConf);
    await migrator.down();
    process.exit(0);
  } catch (error) {
    console.log('Migration rollback failed');
    console.log(error);
    process.exit(1);
  }
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log('Connected to the database');
  } catch (err) {
    console.log(err);
    console.log('Failed to connect to the database');
    return process.exit(1);
  }
  return null;
};

module.exports = { connectToDatabase, sequelize, rollbackMigration };
