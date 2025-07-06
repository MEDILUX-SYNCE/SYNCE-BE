const { DataTypes, Model } = require('sequelize')

class CautionNote extends Model {
  static init(sequelize) {
    return super.init({
      note_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      patient_id: { 
        type: DataTypes.INTEGER, 
        references: { model: 'patients', key: 'patient_id' }
      },
      surgery_id: { 
        type: DataTypes.INTEGER, 
        references: { model: 'surgeries', key: 'surgery_id' }
      },
      type: { 
        type: DataTypes.ENUM('BEFORE', 'AFTER'), 
        allowNull: false 
      },
      category: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
      },
      content: { 
        type: DataTypes.TEXT, 
        allowNull: false 
      }
    }, { 
      sequelize, 
      tableName: 'caution_notes', 
      timestamps: false 
    });
  }

  static associate(models) {
    this.belongsTo(models.Patient, { foreignKey: 'patient_id', as: 'patient' });
    this.belongsTo(models.Surgery, { foreignKey: 'surgery_id', as: 'surgery' });
  }
}

module.exports = CautionNote;