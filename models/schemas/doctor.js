const { DataTypes, Model } = require('sequelize');

class Doctor extends Model {
  static init(sequelize) {
    return super.init({
      doctor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: 'users', key: 'user_id' }
      },
      hospital_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'hospitals', key: 'hospital_id' }
      },
      profile_image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      pr_content: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    }, {
      sequelize,
      tableName: 'doctors',
      timestamps: false,
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'doctor_id', as: 'user' });
    this.belongsTo(models.Hospital, { foreignKey: 'hospital_id', as: 'hospital' });
    this.hasMany(models.Answer, { foreignKey: 'doctor_id', as: 'answers' });
    this.hasMany(models.PatientHospitalLink, { foreignKey: 'doctor_id', as: 'patient_hospital_links' });
    this.hasMany(models.QuestionReport, { foreignKey: 'reporter_id', as: 'question_reports' });
  }
}

module.exports = Doctor;