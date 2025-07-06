const { DataTypes, Model } = require('sequelize');

class Patient extends Model {
  static init(sequelize) {
    return super.init({
      patient_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: 'users', key: 'user_id' }
      },
      email_verified_at: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    }, {
      sequelize,
      tableName: 'patients',
      timestamps: false,
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'patient_id', as: 'users' });
    this.hasMany(models.Surgery, { foreignKey: 'patient_id', as: 'surgeries' });
    this.hasMany(models.Checklist, { foreignKey: 'patient_id', as: 'checklists' });
    this.hasMany(models.CautionNote, { foreignKey: 'patient_id', as: 'caution_notes' });
	  this.hasMany(models.PatientHospitalLink, { foreignKey: 'patient_id', as: 'hospital_links' });
  }
}

module.exports = Patient;