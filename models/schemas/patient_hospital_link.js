const { DataTypes, Model } = require('sequelize');
 
class PatientHospitalLink extends Model {
  static init(sequelize) {
    return super.init({
      link_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      patient_id: { 
        type: DataTypes.INTEGER, 
        references: { model: 'patients', key: 'patient_id' }
      },
      hospital_id: { 
        type: DataTypes.INTEGER, 
        references: { model: 'hospitals', key: 'hospital_id' }
      },
      doctor_id: { 
        type: DataTypes.INTEGER, 
        references: { model: 'doctors', key: 'doctor_id' }
      },
      surgery_id: { 
        type: DataTypes.INTEGER, 
        references: { model: 'surgeries', key: 'surgery_id' }
      },
      surgery_date: { 
        type: DataTypes.DATE, 
        allowNull: false 
      }
    }, { 
      sequelize, 
      tableName: 'patient_hospital_links', 
      timestamps: false 
    });
  }

  static associate(models) {
    this.belongsTo(models.Patient, { foreignKey: 'patient_id', as: 'patient' });
    this.belongsTo(models.Hospital, { foreignKey: 'hospital_id', as: 'hospital' });
    this.belongsTo(models.Doctor, { foreignKey: 'doctor_id', as: 'doctor' });
    this.belongsTo(models.Surgery, { foreignKey: 'surgery_id', as: 'surgery' });
  }
}

module.exports = PatientHospitalLink;