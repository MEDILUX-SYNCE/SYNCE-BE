class EmailVerification extends Model {
  static init(sequelize) {
    return super.init({
      email_verification_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      email: { type: DataTypes.STRING(100), allowNull: false },
      code: { type: DataTypes.STRING(20), allowNull: false },
      request_at: { type: DataTypes.DATE, allowNull: false },
      expires_at: { type: DataTypes.DATE, allowNull: false },
      is_verified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
    }, { sequelize, tableName: 'email_verifications', timestamps: false });
  }
}
