const { DataTypes, Model } = require('sequelize');

class UserActivity extends Model {
  static init(sequelize) {
    return super.init({
      activity_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
        }
      },
      activity_type: {
        type: DataTypes.ENUM('PASSWORD_CHANGE', 'LOGIN', 'LOGOUT'),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      ip_address: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    }, {
      sequelize,
      tableName: 'user_activities',
      timestamps: false
    });
  }

  static associate(models) {
   this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = UserActivity;
