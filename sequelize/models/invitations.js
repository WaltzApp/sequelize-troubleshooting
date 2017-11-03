module.exports = (sequelize, DataTypes) => {
  const invitations = sequelize.define('invitations',
    {
      uid: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      guestUid: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      propertyManagerUid: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      tenantUid: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    }, {
      tableName: 'invitations',
      comment: 'Table to house Invitation info',
      freezeTableName: true,
      timestamps: false,
      indexes: [
        {
          name: 'invitationPropertyManager',
          fields: ['guestUid', 'propertyManagerUid'],
          unique: true,
          where: {
            propertyManagerUid: { $ne: null },
            tenantUid: null,
          },
        },
        {
          name: 'invitationTenant',
          fields: ['guestUid', 'tenantUid'],
          unique: true,
          where: {
            propertyManagerUid: null,
            tenantUid: { $ne: null },
          },
        }],
    });

  return invitations;
};
