const { DataTypes, Model } = require('sequelize');

class SurgerySubcategory extends Model {
  static init(sequelize) {
    return super.init({
      subcategory_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'surgery_categories', key: 'category_id' }
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      }
    }, {
      sequelize,
      tableName: 'surgery_subcategories',
      timestamps: false,
    });
  }

  static associate(models) {
    this.belongsTo(models.SurgeryCategory, { foreignKey: 'category_id', as: 'category' });
    this.hasMany(models.SurgeryType, { foreignKey: 'subcategory_id', as: 'types' });
  }
}

module.exports = SurgerySubcategory;