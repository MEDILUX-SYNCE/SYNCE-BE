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

class SurgeryType extends Model {
  static init(sequelize) {
    return super.init({
      type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      subcategory_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'surgery_subcategories', key: 'subcategory_id' }
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    }, {
      sequelize,
      tableName: 'surgery_types',
      timestamps: false,
    });
  }

  static associate(models) {
    this.belongsTo(models.SurgerySubcategory, { foreignKey: 'subcategory_id', as: 'subcategory' });
    this.hasMany(models.Surgery, { foreignKey: 'type_id', as: 'surgeries' });
    this.hasMany(models.Article, { foreignKey: 'type_id', as: 'articles' });
  }
}

module.exports = { SurgeryCategory, SurgerySubcategory, SurgeryType };
