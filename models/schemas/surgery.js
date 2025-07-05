const { DataTypes, Model } = require('sequelize');

class Surgery extends Model {
  static init(sequelize) {
    return super.init({
      surgery_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      patient_id: { 
        type: DataTypes.INTEGER, 
        references: { model: 'patients', key: 'patient_id' }
      },
      type_id: { 
        type: DataTypes.INTEGER,
        references: { model: 'surgery_types', key: 'type_id' }
      },
      detail: { 
        type: DataTypes.STRING(255), 
        allowNull: true 
      },
      created_at: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: DataTypes.NOW 
      }
    }, { 
      sequelize, 
      tableName: 'surgeries', 
      timestamps: false 
    });
  }

  static associate(models) {
    this.belongsTo(models.Patient, { foreignKey: 'patient_id', as: 'patient' });
    this.belongsTo(models.SurgeryType, { foreignKey: 'type_id', as: 'type' });
    this.hasMany(models.CautionNote, { foreignKey: 'surgery_id', as: 'caution_notes' });
    this.hasMany(models.PatientHospitalLink, { foreignKey: 'surgery_id', as: 'patient_hospital_links' });
    this.hasMany(models.RecordBookSurgery, { foreignKey: 'surgery_id', as: 'record_book_surgeries' });
  }
}

module.exports = Surgery;