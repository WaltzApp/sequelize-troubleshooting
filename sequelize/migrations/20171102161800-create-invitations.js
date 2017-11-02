module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('invitations', {
      uid: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      guestUid: {
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
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('invitations');
  },
};
