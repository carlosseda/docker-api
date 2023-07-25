module.exports = function (sequelize, DataTypes) {
  const AdminPage = sequelize.define('AdminPage', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    localeSeoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'locale_seos',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Por favor, rellena el campo "Url".'
        },
        notNull: {
          msg: 'Por favor, rellena el campo "Url".'
        }
      }
    },
    structure: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Por favor, rellena el campo "Estructura".'
        },
        notNull: {
          msg: 'Por favor, rellena el campo "Estructura".'
        }
      }
    }
  }, {
    sequelize,
    tableName: 'admin_pages',
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
        name: 'admin_pages_url_uindex',
        using: 'BTREE',
        fields: [
          { name: 'url' }
        ]
      },
      {
        name: 'admin_pages_localeSeoId_fk',
        using: 'BTREE',
        fields: [
          { name: 'localeSeoId' }
        ]
      }
    ]
  })

  AdminPage.associate = function (models) {
    AdminPage.belongsTo(models.LocaleSeo, { as: 'localeSeo', foreignKey: 'localeSeoId' })
    AdminPage.hasMany(models.AdminComponent, { as: 'components', foreignKey: 'adminPageId' })
  }

  return AdminPage
}
