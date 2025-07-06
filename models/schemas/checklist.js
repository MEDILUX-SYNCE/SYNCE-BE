const { DataTypes, Model } = require('sequelize')

class Checklist extends Model {
  static init(sequelize) {
    return super.init({
      checklist_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      patient_id: { 
        type: DataTypes.INTEGER, 
        references: { model: 'patients', key: 'patient_id' } 
      },
      category: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
      },
      repeat_days: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
      },
      start_date: { 
        type: DataTypes.DATE, 
        allowNull: false 
      },
      end_date: { 
        type: DataTypes.DATE, 
        allowNull: false 
      }
    }, { 
      sequelize, 
      tableName: 'checklists', 
      timestamps: false 
    });
  }

  static associate(models) {
    this.belongsTo(models.Patient, { foreignKey: 'patient_id', as: 'patient' });
  }
}

module.exports = Checklist;