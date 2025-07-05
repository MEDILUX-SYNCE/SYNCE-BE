const { DataTypes, Model } = require('sequelize');
 
class Tag extends Model {
  static init(sequelize) {
    return super.init({
      tag_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      }
    }, {
      sequelize,
      tableName: 'tags',
      timestamps: false
    });
  }

  static associate(models) {
    this.hasMany(models.ArticleTag, { foreignKey: 'tag_id', as: 'article_tags' });
  }
}

module.exports = Tag;