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
    });

  invitations.associate = (models) => {
    models.invitations.hasMany(models.usersRoles);
  };

  return invitations;
};
