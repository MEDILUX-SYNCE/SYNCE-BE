const { DataTypes, Model } = require('sequelize');

class UserConsent extends Model {
  static init(sequelize) {
    return super.init({
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: 'users', key: 'user_id' }
      },
      consent_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: 'consents', key: 'consent_id' }
      },
      agreed_at: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    }, {
      sequelize,
      tableName: 'user_consents',
      timestamps: false,
    });
  }
  
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Consent, { foreignKey: 'consent_id', as: 'consent' });
  }
}

module.exports = UserConsent;