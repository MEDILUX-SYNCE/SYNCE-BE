const { DataTypes, Model } = require('sequelize');

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

module.exports = QuestionImage;