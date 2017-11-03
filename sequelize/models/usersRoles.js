module.exports = (sequelize, DataTypes) => {
  const usersRoles = sequelize.define('usersRoles',
    {
      key: {
        type: DataTypes.UUID,
        primary: true,
      },
      userUid: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      roleUid: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      oemUid: {
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
    },
    {
      tableName: 'usersRoles',
      indexes: [
        {
          name: 'userRoleOem',
          fields: ['userUid', 'roleUid', 'oemUid'],
          unique: true,
          where: {
            oemUid: { $ne: null },
            propertyManagerUid: null,
            tenantUid: null,
          },
        },
        {
          name: 'userRolePropertyManager',
          fields: ['userUid', 'roleUid', 'propertyManagerUid'],
          unique: true,
          where: {
            oemUid: null,
            propertyManagerUid: { $ne: null },
            tenantUid: null,
          },
        },
        {
          name: 'userRoleTenant',
          fields: ['userUid', 'roleUid', 'tenantUid'],
          unique: true,
          where: {
            oemUid: null,
            propertyManagerUid: null,
            tenantUid: { $ne: null },
          },
        },
      ],
      comment: 'Table to house the concept of a users being a Role under a Tenant, Property Manager or OEM',
      freezeTableName: true,
      timestamps: false,
    });

  usersRoles.removeAttribute('id');

  usersRoles.associate = (models) => {
    models.usersRoles.hasMany(models.invitations);
  };

  return usersRoles;
};
