module.exports = function (sequelize, DataTypes) {
  const FrontPage = sequelize.define('FrontPage', {
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
    tableName: 'front_pages',
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
        name: 'front_pages_url_uindex',
        using: 'BTREE',
        fields: [
          { name: 'url' }
        ]
      },
      {
        name: 'front_pages_localeSeoId_fk',
        using: 'BTREE',
        fields: [
          { name: 'localeSeoId' }
        ]
      }
    ]
  })

  FrontPage.associate = function (models) {
    FrontPage.belongsTo(models.LocaleSeo, { as: 'localeSeo', foreignKey: 'localeSeoId' })
  }

  return FrontPage
}
