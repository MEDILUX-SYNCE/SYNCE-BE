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

module.exports = Question;