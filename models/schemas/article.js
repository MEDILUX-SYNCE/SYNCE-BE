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

module.exports = {
  Article,
  Tag,
  ArticleTag
};
