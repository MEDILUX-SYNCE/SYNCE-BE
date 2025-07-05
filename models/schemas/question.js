const { DataTypes, Model } = require('sequelize');

class Question extends Model {
  static init(sequelize) {
    return super.init({
      question_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ticket_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'question_tickets', key: 'ticket_id' }
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      question_status: {
        type: DataTypes.ENUM('REGISTERED', 'REPORTED', 'DELETED', 'ANSWERED'),
        allowNull: false,
        defaultValue: 'REGISTERED'
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      answered_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      auto_refund_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'questions',
      timestamps: false
    });
  }

  static associate(models) {
    this.belongsTo(models.QuestionTicket, { foreignKey: 'ticket_id', as: 'ticket' });
    this.hasMany(models.QuestionImage, { foreignKey: 'question_id', as: 'images' });
    this.hasMany(models.Answer, { foreignKey: 'question_id', as: 'answers' });
    this.hasMany(models.QuestionReport, { foreignKey: 'question_id', as: 'reports' });
    this.hasMany(models.AdminAction, { foreignKey: 'question_id', as: 'admin_actions' });
    this.hasMany(models.Refund, { foreignKey: 'question_id', as: 'refunds' });
    this.hasMany(models.AutoRefundSchedule, { foreignKey: 'question_id', as: 'auto_refund_schedules' });
  }
}

class QuestionImage extends Model {
  static init(sequelize) {
    return super.init({
      image_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'questions', key: 'question_id' }
      },
      image_url: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'question_images',
      timestamps: false
    });
  }

  static associate(models) {
    this.belongsTo(models.Question, { foreignKey: 'question_id', as: 'question' });
  }
}

class Answer extends Model {
  static init(sequelize) {
    return super.init({
      answer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'questions', key: 'question_id' }
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'doctors', key: 'doctor_id' }
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      answer_status: {
        type: DataTypes.ENUM('DRAFT', 'PUBLISHED', 'DELETED'),
        allowNull: false,
        defaultValue: 'PUBLISHED'
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'answers',
      timestamps: false
    });
  }

  static associate(models) {
  this.belongsTo(models.Question, { foreignKey: 'question_id', as: 'question' });
    this.belongsTo(models.Doctor, { foreignKey: 'doctor_id', as: 'doctor' });
  }
}

class QuestionReport extends Model {
  static init(sequelize) {
    return super.init({
      report_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'questions', key: 'question_id' }
      },
      reporter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'doctors', key: 'doctor_id' }
      },
      report_reason: {
        type: DataTypes.ENUM('INAPPROPRIATE', 'SPAM', 'VIOLENCE', 'OTHER'),
        allowNull: false
      },
      report_content: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      report_status: {
        type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED'),
        allowNull: false,
        defaultValue: 'PENDING'
      },
      reported_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      processed_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      processed_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'user_id' }
      }
    }, {
      sequelize,
      tableName: 'question_reports',
      timestamps: false
    });
  }

  static associate(models) {
    this.belongsTo(models.Question, { foreignKey: 'question_id', as: 'question' });
    this.belongsTo(models.Doctor, { foreignKey: 'reporter_id', as: 'reporter' });
    this.belongsTo(models.User, { foreignKey: 'processed_by', as: 'processed_by_user' });
    this.hasMany(models.AdminAction, { foreignKey: 'report_id', as: 'admin_actions' });
  }
}

class AdminAction extends Model {
  static init(sequelize) {
    return super.init({
      action_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'questions', key: 'question_id' }
      },
      report_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'question_reports', key: 'report_id' }
      },
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'user_id' }
      },
      action_type: {
        type: DataTypes.ENUM('DELETE', 'WARNING', 'REFUND_APPROVE', 'REFUND_REJECT'),
        allowNull: false
      },
      action_reason: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      refund_eligible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    }, {
      sequelize,
      tableName: 'admin_actions',
      timestamps: false
    });
  }

  static associate(models) {
    this.belongsTo(models.Question, { foreignKey: 'question_id', as: 'question' });
    this.belongsTo(models.QuestionReport, { foreignKey: 'report_id', as: 'report' });
    this.belongsTo(models.User, { foreignKey: 'admin_id', as: 'admin' });
  }
}

module.exports = {
  Question,
  QuestionImage,
  Answer,
  QuestionReport,
  AdminAction
};
