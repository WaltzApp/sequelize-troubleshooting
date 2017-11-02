module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('usersRoles', {
      key: {
        type: Sequelize.UUID,
        primary: true,
      },
      userUid: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      roleUid: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      oemUid: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      propertyManagerUid: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      tenantUid: {
        type: Sequelize.UUID,
        allowNull: true,
      },
    })
      .then(() => {
        return queryInterface.addIndex('usersRoles',
          ['userUid', 'roleUid', 'oemUid'],
          {
            indexName: 'userRoleOem',
            indicesType: 'UNIQUE',
            where: {
              oemUid: { $ne: null },
              propertyManagerUid: null,
              tenantUid: null,
            },
          });
      })
      .then(() => {
        return queryInterface.addIndex('usersRoles',
          ['userUid', 'roleUid', 'propertyManagerUid'],
          {
            indexName: 'userRolePropertyManager',
            indicesType: 'UNIQUE',
            where: {
              oemUid: null,
              propertyManagerUid: { $ne: null },
              tenantUid: null,
            },
          });
      })
      .then(() => {
        return queryInterface.addIndex('usersRoles',
          ['userUid', 'roleUid', 'tenantUid'],
          {
            indexName: 'userRoleTenant',
            indicesType: 'UNIQUE',
            where: {
              oemUid: null,
              propertyManagerUid: null,
              tenantUid: { $ne: null },
            },
          });
      });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('usersRoles');
  },
};
