const { DataTypes, Model } = require('sequelize')

class RecordImage extends Model {
  static init(sequelize) {
    return super.init({
      image_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      entry_id: { 
        type: DataTypes.INTEGER, 
        references: { model: 'record_entries', key: 'entry_id' }
      },
      image_url: { 
        type: DataTypes.TEXT, 
        allowNull: false 
      }
    }, { 
      sequelize, 
      tableName: 'record_images', 
      timestamps: false 
    });
  }

  static associate(models) {
    this.belongsTo(models.RecordEntry, { foreignKey: 'entry_id', as: 'entry' });
  }
}

module.exports = RecordImage;