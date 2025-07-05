const { DataTypes, Model } = require('sequelize')

class LoginHistory extends Model {
  static init(sequelize) {
    return super.init({
      history_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      user_id: { 
        type: DataTypes.INTEGER,
        references: { model: 'users', key: 'user_id' }
      },
      device_type: { 
        type: DataTypes.ENUM('MOBILE', 'TABLET', 'PC'), 
        allowNull: false 
      },
      platform: { 
        type: DataTypes.STRING(100), 
        allowNull: true 
      },
      device_info: { 
        type: DataTypes.TEXT, 
        allowNull: true 
      },
      ip_address: { 
        type: DataTypes.STRING(100), 
        allowNull: true 
      },
      action_at: { 
        type: DataTypes.DATE, 
        allowNull: false 
      },
      result: { 
        type: DataTypes.ENUM('SUCCESS', 'FAILURE'), 
        allowNull: false 
      },
      reason: { 
        type: DataTypes.TEXT, 
        allowNull: true 
      }
    }, { 
      sequelize, 
      tableName: 'login_histories', 
      timestamps: false 
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = LoginHistory;