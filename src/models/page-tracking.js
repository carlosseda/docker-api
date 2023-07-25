module.exports = function (sequelize, DataTypes) {
  const PageTracking = sequelize.define('PageTracking', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    fingerprint: {
      type: DataTypes.STRING
    },
    ip: {
      allowNull: false,
      type: DataTypes.STRING
    },
    isRobot: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    localeSeoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'locale_seos',
        key: 'id'
      }
    },
    startTime: {
      allowNull: false,
      type: DataTypes.DOUBLE
    },
    endTime: {
      allowNull: false,
      type: DataTypes.DOUBLE
    },
    latencyMS: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  },{
    sequelize,
    tableName: 'page_trackings',
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
        name: 'apiTrackings_userId_foreign_idx',
        using: 'BTREE',
        fields: [
          { name: 'userId' }
        ]
      },
      {
        name: 'apiTrackings_fingerprint_foreign_idx',
        using: 'BTREE',
        fields: [
          { name: 'fingerprint' }
        ]
      },
      {
        name: 'apiTrackings_localeSeoId_foreign_idx',
        using: 'BTREE',
        fields: [
          { name: 'localeSeoId' }
        ]
      }
    ]
  })

  PageTracking.associate = function (models) {
    PageTracking.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })

    PageTracking.belongsTo(models.Fingerprint, {
      foreignKey: 'fingerprint',
    })

    PageTracking.belongsTo(models.LocaleSeo, {
      foreignKey: 'localeSeoId',
      as: 'localeSeo'
    })
  }

  return PageTracking
}
