const path = require('path');
const glob = require('glob');
const Promise = require('bluebird');

const Sequelize = require('sequelize');
const configs = require('./sequelize/config');

const models = {};

const performQuery = (db) => {
  const { usersRoles, invitations } = db; // eslint-disable-line max-len

  const sql = {
    include: {
      model: invitations,
      // as: 'invitation',
      on: {
        user: Sequelize.where(
          Sequelize.col('usersRoles.userUid'),
          '=',
          Sequelize.col('invitation.guestUid')),
        propertyManager: Sequelize.where(
          Sequelize.col('usersRoles.propertyManagerUid'),
          '=',
          Sequelize.col('invitation.propertyManagerUid')),
        tenant: Sequelize.where(
          Sequelize.col('usersRoles.tenantUid'),
          '=',
          Sequelize.col('invitation.tenantUid')),
      },
    },
  };
  return usersRoles.findAll(sql);
};

// The rest is just setting up the connection and launching the query.

const sequelize = new Sequelize(
  configs.database,
  configs.username,
  configs.password,
  {
    dialect: configs.dialect,
  });

const modelsPath = path.join(__dirname, 'sequelize/models');
const globOpts = {
  cwd: modelsPath,
  ignore: '**/index.js',
  realPath: false,
  nosort: true,
  nodir: true,
};

glob('**/*.js', globOpts, (err, files) => {
  Promise.map(files, (file) => {
    const model = sequelize.import(path.join(modelsPath, file));
    models[model.name] = model;
  })
    .then(() => {
      Object.keys(models).forEach((modelName) => {
        if (models[modelName].associate) {
          models[modelName].associate(models);
        }
      });
      return performQuery(models);
    })
    .then((res) => {
      console.log('SUCCESS', res);
    }, (reason) => {
      console.error('FAILED', reason);
    });
});
