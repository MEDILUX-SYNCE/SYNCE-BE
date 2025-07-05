const { DataTypes, Model } = require('sequelize');

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
        references: {
          model: 'questions',
          key: 'question_id'
        }
      },
      report_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'question_reports',
          key: 'report_id'
        }
      },
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
        }
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

module.exports = AdminAction;