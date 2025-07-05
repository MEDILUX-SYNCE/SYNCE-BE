const { DataTypes, Model } = require('sequelize');

class SurgeryCategory extends Model {
  static init(sequelize) {
    return super.init({
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      }
    }, {
      sequelize,
      tableName: 'surgery_categories',
      timestamps: false,
    });
  }

  static associate(models) {
    this.hasMany(models.SurgerySubcategory, { foreignKey: 'category_id', as: 'subcategories' });
  }
}

module.exports = SurgeryCategory;