module.exports = function (sequelize, DataTypes) {
  const LocaleSeo = sequelize.define('LocaleSeo', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    languageAlias: {
      allowNull: false,
      type: DataTypes.STRING
    },
    prefix: {
      type: DataTypes.STRING
    },
    url: {
      allowNull: false,
      type: DataTypes.STRING
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    keywords: {
      type: DataTypes.STRING
    },
    redirection: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    menu: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    },
    changeFrequency: {
      type: DataTypes.STRING
    },
    priority: {
      type: DataTypes.DECIMAL
    },
    sitemap: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'locale_seos',
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
      }
    ]
  })

  LocaleSeo.associate = function (models) {
    LocaleSeo.hasMany(models.LocaleSeoRedirect, { as: 'redirects', foreignKey: 'localeSeoId' })
    LocaleSeo.hasMany(models.LocaleSeoSlug, { as: 'slugs', foreignKey: 'localeSeoId' })
    LocaleSeo.hasMany(models.MenuItem, { as: 'menuItems', foreignKey: 'localeSeoId' })
    LocaleSeo.hasMany(models.FrontPage, { as: 'frontPages', foreignKey: 'localeSeoId' })
    LocaleSeo.hasMany(models.AdminPage, { as: 'adminPages', foreignKey: 'localeSeoId' })
    LocaleSeo.hasMany(models.PageTracking, { as: 'pageTrackings', foreignKey: 'localeSeoId' })
  }

  return LocaleSeo
}
