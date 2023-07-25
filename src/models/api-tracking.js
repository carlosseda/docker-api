module.exports = function (sequelize, DataTypes) {
  const ApiTracking = sequelize.define('ApiTracking', {
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
    resource: {
      allowNull: false,
      type: DataTypes.STRING
    },
    resourceElement: {
      type: DataTypes.INTEGER
    },
    method: {
      allowNull: false,
      type: DataTypes.STRING
    },
    httpCode: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    message: {
      type: DataTypes.TEXT
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
      type: DataTypes.DOUBLE
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
      type: DataTypes.DATE
    }
  },{
    sequelize,
    tableName: 'api_trackings',
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

  ApiTracking.associate = function (models) {
    ApiTracking.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })

    ApiTracking.belongsTo(models.Fingerprint, {
      foreignKey: 'fingerprint',
    })
  }

  return ApiTracking
}
