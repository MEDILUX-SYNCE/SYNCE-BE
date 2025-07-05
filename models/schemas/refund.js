const { DataTypes, Model } = require('sequelize');

class Refund extends Model {
  static init(sequelize) {
    return super.init({
      refund_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      payment_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
          model: 'payments',
          key: 'payment_id'
        }
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'questions',
          key: 'question_id'
        }
      },
      refund_type: {
        type: DataTypes.ENUM('AUTO_48H', 'ADMIN_DELETE'),
        allowNull: false
      },
      refund_method: {
        type: DataTypes.ENUM('TICKET_ADD'),
        allowNull: false
      },
      refund_status: {
        type: DataTypes.ENUM('PENDING', 'COMPLETED'),
        allowNull: false,
        defaultValue: 'PENDING'
      },
      refund_reason: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      processed_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      processed_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'user_id'
        }
      }
    }, {
      sequelize,
      tableName: 'refunds',
      timestamps: false
    });
  }

  static associate(models) {
    this.belongsTo(models.Payment, { foreignKey: 'payment_id', as: 'payment' });
    this.belongsTo(models.Question, { foreignKey: 'question_id', as: 'question' });
    this.belongsTo(models.User, { foreignKey: 'processed_by', as: 'processed_by_user' });
    this.hasMany(models.RefundTicket, { foreignKey: 'refund_id', as: 'refund_tickets' });
  }
}

class RefundTicket extends Model {
  static init(sequelize) {
    return super.init({
      refund_ticket_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      refund_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'refunds',
          key: 'refund_id'
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
        }
      },
      ticket_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'question_tickets',
          key: 'ticket_id'
        }
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    }, {
      sequelize,
      tableName: 'refund_tickets',
      timestamps: false
    });
  }

  static associate(models) {
    this.belongsTo(models.Refund, { foreignKey: 'refund_id', as: 'refund' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.QuestionTicket, { foreignKey: 'ticket_id', as: 'ticket' });
  }
}

class AutoRefundSchedule extends Model {
  static init(sequelize) {
    return super.init({
      schedule_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'questions',
          key: 'question_id'
        }
      },
      scheduled_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      executed_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM('PENDING', 'EXECUTED', 'CANCELLED'),
        allowNull: false,
        defaultValue: 'PENDING'
      }
    }, {
      sequelize,
      tableName: 'auto_refund_schedules',
      timestamps: false
    });
  }

  static associate(models) {
    this.belongsTo(models.Question, { foreignKey: 'question_id', as: 'question' });
  }
}

module.exports = {
  Refund,
  RefundTicket,
  AutoRefundSchedule
};
