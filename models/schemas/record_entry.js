const { DataTypes, Model } = require('sequelize')

class RecordEntry extends Model {
  static init(sequelize) {
    return super.init({
      entry_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      record_book_id: { 
        type: DataTypes.INTEGER, 
        references: { model: 'record_books', key: 'record_book_id' }
      },
      date: { 
        type: DataTypes.DATE, 
        allowNull: false 
      },
      symptom: { 
        type: DataTypes.TEXT, 
        allowNull: true 
      },
      diary: { 
        type: DataTypes.TEXT, 
        allowNull: true 
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
      tableName: 'record_entries', 
      timestamps: false 
    });
  }

  static associate(models) {
    this.belongsTo(models.RecordBook, { foreignKey: 'record_book_id', as: 'record_book' });
    this.hasMany(models.RecordImage, { foreignKey: 'entry_id', as: 'images' });
  }
}

module.exports = RecordEntry;