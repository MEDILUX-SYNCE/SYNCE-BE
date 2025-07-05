const { DataTypes, Model } = require('sequelize');

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

module.exports = AutoRefundSchedule;