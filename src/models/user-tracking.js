module.exports = function (sequelize, DataTypes) {
  const UserTracking = sequelize.define('UserTracking', {
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
    eventTime: {
      type: DataTypes.DOUBLE
    },
    eventName: {
      type: DataTypes.STRING
    },
    path: {
      type: DataTypes.STRING
    },
    event: {
      type: DataTypes.TEXT
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
    tableName: 'user_trackings',
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
      }
    ]
  })

  UserTracking.associate = function (models) {
    UserTracking.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })

    UserTracking.belongsTo(models.Fingerprint, {
      foreignKey: 'fingerprint',
    })
  }

  return UserTracking
}
