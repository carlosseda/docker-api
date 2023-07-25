module.exports = function (sequelize, DataTypes) {
  const ApiResource = sequelize.define('ApiResource', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    endpoint: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tableName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tableDefinition: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    modelDefinition: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'api_resources',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' }
        ]
      },
      {
        name: 'api_resources_url_unique',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'url' }
        ]
      }
    ]
  })

  ApiResource.associate = function (models) {
    ApiResource.hasMany(models.AdminComponent, {
      foreignKey: 'apiResourceId',
      as: 'adminComponents'
    })
  }

  return ApiResource
}
