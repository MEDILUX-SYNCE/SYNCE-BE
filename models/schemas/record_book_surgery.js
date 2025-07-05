const { DataTypes, Model } = require('sequelize')
class RecordBookSurgery extends Model {
  static init(sequelize) {
    return super.init({
      record_book_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        references: { model: 'record_books', key: 'record_book_id' }
      },
      surgery_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        references: { model: 'surgeries', key: 'surgery_id' }
      }
    }, { 
      sequelize, 
      tableName: 'record_book_surgeries', 
      timestamps: false 
    });
  }

  static associate(models) {
    this.belongsTo(models.RecordBook, { foreignKey: 'record_book_id', as: 'record_book' });
    this.belongsTo(models.Surgery, { foreignKey: 'surgery_id', as: 'surgery' });
  }
}

module.exports = RecordBookSurgery;