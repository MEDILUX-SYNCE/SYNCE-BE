const { DataTypes, Model } = require('sequelize');

class Hospital extends Model {
  static init(sequelize) {
    return super.init({
      hospital_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      }
    }, {
      sequelize,
      tableName: 'hospitals',
      timestamps: false,
    });
  }
  
  static associate(models) {
    this.hasMany(models.Doctor, { foreignKey: 'hospital_id', as: 'doctors' });
    this.hasMany(models.PatientHospitalLink, { foreignKey: 'hospital_id', as: 'patient_hospital_links' });
    this.hasMany(models.RecordBook, { foreignKey: 'hospital_id', as: 'record_books' });
  }
}

module.exports = Hospital;