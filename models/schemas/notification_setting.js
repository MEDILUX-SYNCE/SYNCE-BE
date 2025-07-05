const { DataTypes, Model } = require('sequelize');

class NotificationSetting extends Model {
  static init(sequelize) {
    return super.init({
      setting_id: {
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
      all_notifications: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      doctor_consultation: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      daily_checklist: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      record_book: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      article: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    }, {
      sequelize,
      tableName: 'notification_settings',
      timestamps: false
    });
  }

  static associate(models) {
   this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = NotificationSetting;
