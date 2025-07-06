const { DataTypes, Model } = require('sequelize');

class Notification extends Model {
  static init(sequelize) {
    return super.init({
      notification_id: {
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
      type: {
        type: DataTypes.ENUM('DOCTOR_CONSULTATION', 'DAILY_CHECKLIST', 'RECORD_BOOK', 'ARTICLE'),
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    }, {
      sequelize,
      tableName: 'notifications',
      timestamps: false
    });
  }

  static associate(models) {
   this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = Notification;