const { DataTypes, Model } = require('sequelize')

class RecordBook extends Model {
  static init(sequelize) {
    return super.init({
      record_book_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      user_id: { 
        type: DataTypes.INTEGER, 
        references: { model: 'users', key: 'user_id' }
      },
      title: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
      },
      hospital_id: { 
        type: DataTypes.INTEGER, 
        references: { model: 'hospitals', key: 'hospital_id' },
        allowNull: true
      },
      surgery_date: { 
        type: DataTypes.DATE, 
        allowNull: false 
      },
      created_at: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: DataTypes.NOW 
      }
    }, { 
      sequelize, 
      tableName: 'record_books', 
      timestamps: false 
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Hospital, { foreignKey: 'hospital_id', as: 'hospital' });
    this.hasMany(models.RecordEntry, { foreignKey: 'record_book_id', as: 'entries' });
    this.hasMany(models.RecordBookSurgery, { foreignKey: 'record_book_id', as: 'record_book_surgeries' });
  }
}

module.exports = RecordBook;