const { DataTypes, Model } = require('sequelize');

class Consent extends Model {
  static init(sequelize) {
    return super.init({
      consent_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      consent_type: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      version: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      }
    }, {
      sequelize,
      tableName: 'consents',
      timestamps: false,
    });
  }

  static associate(models) {
    this.hasMany(models.UserConsent, { foreignKey: 'consent_id', as: 'user_consents'});
  }
}
module.exports = Consent;