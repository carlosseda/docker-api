module.exports = (sequelize, DataTypes) => {
  const CartDetail = sequelize.define('CartDetail', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cart',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Product',
        key: 'id'
      }
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    basePrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false
    },
    taxPrice: {
      type: DataTypes.DECIMAL(6, 2)
    },
    unitOfMeasurement: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'carts',
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
        name: 'cartDetail_cartId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'cartId' }
        ]
      },
      {
        name: 'cartDetail_productId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'productId' }
        ]
      }
    ]
  })

  CartDetail.associate = function (models) {
    CartDetail.belongsTo(models.Cart, { as: 'cart', foreignKey: 'cartId' })
    CartDetail.belongsTo(models.Product, { as: 'product', foreignKey: 'productId' })
  }

  return CartDetail
}
