const { DataTypes, Model } = require('sequelize');

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

module.exports = QuestionReport;