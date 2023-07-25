module.exports = function (sequelize, DataTypes) {
  const AdminComponent = sequelize.define('AdminComponent', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    apiResourceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'api_resources',
        key: 'id'
      }
    },
    adminPageId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'admin_pages',
        key: 'id'
      },
    },
    endpoint: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    structure: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'admin_components',
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
        name: 'admin_components_api_resource_id_fk',
        using: 'BTREE',
        fields: [
          { name: 'apiResourceId' }
        ]
      },
      {
        name: 'admin_components_admin_page_id_fk',
        using: 'BTREE',
        fields: [
          { name: 'adminPageId' }
        ]
      }
    ]
  })

  AdminComponent.associate = function (models) {
    AdminComponent.belongsTo(models.ApiResource, {
      foreignKey: 'apiResourceId',
      as: 'apiResource'
    })
    AdminComponent.belongsTo(models.AdminPage, {
      foreignKey: 'adminPageId',
      as: 'adminPage'
    })
  }

  return AdminComponent
}
