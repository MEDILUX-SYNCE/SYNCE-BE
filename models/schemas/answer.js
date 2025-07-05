const { DataTypes, Model } = require('sequelize');

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
          model: 'questions',
          key: 'question_id'
        }
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'doctors',
          key: 'doctor_id'
        }
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

module.exports = Answer;
