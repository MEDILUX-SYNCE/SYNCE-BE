const { DataTypes, Model } = require('sequelize');

class Notice extends Model {
  static init(sequelize) {
    return super.init({
      notice_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      title: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
      },
      content: { 
        type: DataTypes.TEXT, 
        allowNull: false 
      },
      created_by: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
      },
      created_at: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: DataTypes.NOW 
      },
      updated_at: { 
        type: DataTypes.DATE, 
        allowNull: true 
      }
    }, { 
      sequelize, 
      tableName: 'notices', 
      timestamps: false 
    });
  }

  static associate(models) {
   this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = Notice;