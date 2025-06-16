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
        allowNull: true, // Apple 로그인 시 NULL 가능
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true, // Apple 로그인 시 NULL 가능
      },
      user_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('PATIENT', 'DOCTOR', 'ADMIN'),
        allowNull: false,
      },
      state: {
        type: DataTypes.ENUM('ACTIVE', 'WITHDRAWN'),
        defaultValue: 'ACTIVE',
      },
      login_type: {
        type: DataTypes.ENUM('APPLE', 'EMAIL'),
        defaultValue: 'EMAIL',
      },
      apple_user_id: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: true,
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
    // User - Patient (1:1)
    this.hasOne(models.Patient, {
      as: "patient",
      foreignKey: "patient_id",
      sourceKey: "user_id"
    });

    // User - Doctor (1:1)
    this.hasOne(models.Doctor, {
      as: "doctor", 
      foreignKey: "doctor_id",
      sourceKey: "user_id"
    });

    // User - QuestionTicket (1:N)
    this.hasMany(models.QuestionTicket, {
      as: "question_tickets",
      foreignKey: "user_id"
    });

    // User - RecordBook (1:N)
    this.hasMany(models.RecordBook, {
      as: "record_books",
      foreignKey: "user_id"
    });
  }

  // 인스턴스 메서드
  isActive() {
    return this.state === 'ACTIVE';
  }
  
  isPatient() {
    return this.role === 'PATIENT';
  }

  isDoctor() {
    return this.role === 'DOCTOR';
  }

  isAdmin() {
    return this.role === 'ADMIN';
  }
}

module.exports = User;