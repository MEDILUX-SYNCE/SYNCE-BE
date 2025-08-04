const { DataTypes, Model, Sequelize } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    return super.init({
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      birth_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('PATIENT', 'DOCTOR', 'ADMIN'),
        allowNull: false,
      },
      state: {
        type: DataTypes.ENUM('ACTIVE', 'WITHDRAWN'),
        defaultValue: 'ACTIVE',
        allowNull: true,
      },
      login_type: {
        type: DataTypes.ENUM('APPLE', 'GOOGLE'),
        allowNull: false,
      },
      apple_user_id: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: true,
      },
      google_user_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    }, {
      sequelize,
      tableName: "users",
      timestamps: false,
    });
  }

  static associate(models) {
    this.hasOne(models.Patient, { 
      as: 'patients', 
      foreignKey: 'patient_id', 
      sourceKey: 'user_id'
    });
    this.hasOne(models.Doctor, {
      as: 'doctors',
      foreignKey: 'doctor_id',
      sourceKey: 'user_id'
    });
    this.hasMany(models.QuestionTicket, {
      as: 'question_tickets',
      foreignKey: 'user_id'
    });
    this.hasMany(models.RecordBook, {
      as: 'record_books',
      foreignKey: 'user_id'
    });
    this.hasMany(models.UserConsent, {
      as: 'user_consents',
      foreignKey: 'user_id'
    });
    this.hasMany(models.AuthToken, {
      as: 'auth_tokens',
      foreignKey: 'user_id'
    });
    this.hasMany(models.LoginHistory, {
      as: 'login_histories',
      foreignKey: 'user_id'
    });
    this.hasMany(models.Payment, {
      as: 'payments',
      foreignKey: 'user_id'
    });
    this.hasMany(models.Article, {
      as: 'articles',
      foreignKey: 'user_id'
    });
    this.hasMany(models.Notice, {
      as: 'notices',
      foreignKey: 'user_id'
    });
    this.hasMany(models.QuestionReport, {
      as: 'question_reports',
      foreignKey: 'user_id'
    });
    this.hasMany(models.NotificationSetting, {
      as: 'notification_settings',
      foreignKey: 'user_id'
    });
    this.hasMany(models.AdminAction, {
      as: 'admin_action',
      foreignKey: 'user_id'
    });
    this.hasMany(models.Notification, {
      as: 'notifications',
      foreignKey: 'user_id'
    });
    this.hasMany(models.Refund, {
      as: 'refunds',
      foreignKey: 'user_id'
    });
    this.hasMany(models.RefundTicket, {
      as: 'refund_tickets',
      foreignKey: 'user_id'
    });
  }
}

module.exports = User;