const { DataTypes, Model } = require('sequelize');

class AuthToken extends Model {
  static init(sequelize) {
    return super.init({
      token_id: { 
        type: DataTypes.STRING(36), 
        primaryKey: true 
      },
      user_id: { 
        type: DataTypes.INTEGER,
        references: { model: 'users', key: 'user_id' }
      },
      token_type: { 
        type: DataTypes.ENUM('ACCESS', 'REFRESH'), 
        allowNull: false 
      },
      token_value: { 
        type: DataTypes.STRING(512), 
        allowNull: false 
      },
      issued_at: { 
        type: DataTypes.DATE, 
        allowNull: false 
      },
      expires_at: { 
        type: DataTypes.DATE, 
        allowNull: false 
      },
      is_valid: { 
        type: DataTypes.BOOLEAN, 
        allowNull: false, 
        defaultValue: true
      },
      device_type: { 
        type: DataTypes.ENUM('MOBILE', 'TABLET', 'PC'), 
        allowNull: false 
      },
      ip_address: { 
        type: DataTypes.STRING(100), 
        allowNull: true 
      }
    }, { 
      sequelize, 
      tableName: 'auth_tokens', 
      timestamps: false 
    });
  }

  static associate(models) {
    this.belongsTo(models.User, {
      as: 'users',
      foreignKey: 'user_id'
    });
  }
}

module.exports = AuthToken;