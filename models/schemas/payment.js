const { DataTypes, Model } = require('sequelize')

class Payment extends Model {
  static init(sequelize) {
    return super.init({
      payment_id: { 
        type: DataTypes.STRING(36), 
        primaryKey: true 
      },
      user_id: { 
        type: DataTypes.INTEGER, 
        references: { model: 'users', key: 'user_id' }
      },
      payment_method: { 
        type: DataTypes.ENUM('KAKAOPAY', 'FREE'), 
        allowNull: false 
      },
      total_amount: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
      },
      payment_status: { 
        type: DataTypes.ENUM('READY', 'SUCCESS', 'FAIL', 'CANCEL'), 
        allowNull: false, 
        defaultValue: 'READY' 
      },
      tid: { 
        type: DataTypes.STRING(100), 
        allowNull: true 
      },
      partner_order_id: { 
        type: DataTypes.STRING(100), 
        allowNull: true 
      },
      partner_user_id: { 
        type: DataTypes.STRING(100), 
        allowNull: true 
      },
      pg_token: { 
        type: DataTypes.STRING(100), 
        allowNull: true 
      },
      approved_at: { 
        type: DataTypes.DATE, 
        allowNull: true 
      },
      created_at: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: DataTypes.NOW 
      }
    }, { 
      sequelize, 
      tableName: 'payments', 
      timestamps: false 
    });
  }
}

module.exports = Payment;