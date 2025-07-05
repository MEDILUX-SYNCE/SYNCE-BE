const { DataTypes, Model } = require('sequelize');

class ArticleTag extends Model {
  static init(sequelize) {
    return super.init({
      article_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'articles',
          key: 'article_id'
        }
      },
      tag_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'tags',
          key: 'tag_id'
        }
      }
    }, {
      sequelize,
      tableName: 'article_tags',
      timestamps: false
    });
  }

  static associate(models) {
    this.belongsTo(models.Article, { foreignKey: 'article_id', as: 'article' });
    this.belongsTo(models.Tag, { foreignKey: 'tag_id', as: 'tag' });
  }
}

module.exports = ArticleTag;