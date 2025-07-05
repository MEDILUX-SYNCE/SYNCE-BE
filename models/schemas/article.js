const { DataTypes, Model } = require('sequelize');

class Article extends Model {
  static init(sequelize) {
    return super.init({
      article_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'surgery_types',
          key: 'type_id'
        }
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      thumbnail: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
        }
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    }, {
      sequelize,
      tableName: 'articles',
      timestamps: false
    });
  }

  static associate(models) {
    this.belongsTo(models.SurgeryType, { foreignKey: 'type_id', as: 'surgery_type' });
    this.belongsTo(models.User, { foreignKey: 'author_id', as: 'author' });
    this.hasMany(models.ArticleTag, { foreignKey: 'article_id', as: 'article_tags' });
  }
}

module.exports = Article;
