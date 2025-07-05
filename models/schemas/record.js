const { DataTypes, Model } = require('sequelize')

class RecordBook extends Model {
  static init(sequelize) {
    return super.init({
      record_book_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      user_id: { 
        type: DataTypes.INTEGER, 
        references: { model: 'users', key: 'user_id' }
      },
      title: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
      },
      hospital_id: { 
        type: DataTypes.INTEGER, 
        references: { model: 'hospitals', key: 'hospital_key' },
        allowNull: true
      },
      surgery_date: { 
        type: DataTypes.DATE, 
        allowNull: false 
      },
      created_at: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: DataTypes.NOW 
      }
    }, { 
      sequelize, 
      tableName: 'record_books', 
      timestamps: false 
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Hospital, { foreignKey: 'hospital_id', as: 'hospital' });
    this.hasMany(models.RecordEntry, { foreignKey: 'record_book_id', as: 'entries' });
    this.hasMany(models.RecordBookSurgery, { foreignKey: 'record_book_id', as: 'record_book_surgeries' });
  }
}

class RecordBookSurgery extends Model {
  static init(sequelize) {
    return super.init({
      record_book_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        references: { model: 'record_books', key: 'record_book_id' }
      },
      surgery_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        references: { model: 'surgeries', key: 'surgery_id' }
      }
    }, { 
      sequelize, 
      tableName: 'record_book_surgeries', 
      timestamps: false 
    });
  }

  static associate(models) {
    this.belongsTo(models.RecordBook, { foreignKey: 'record_book_id', as: 'record_book' });
    this.belongsTo(models.Surgery, { foreignKey: 'surgery_id', as: 'surgery' });
  }
}

class RecordEntry extends Model {
  static init(sequelize) {
    return super.init({
      entry_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      record_book_id: { 
        type: DataTypes.INTEGER, 
        references: { model: 'record_books', key: 'record_book_id' }
      },
      date: { 
        type: DataTypes.DATE, 
        allowNull: false 
      },
      symptom: { 
        type: DataTypes.TEXT, 
        allowNull: true 
      },
      diary: { 
        type: DataTypes.TEXT, 
        allowNull: true 
      },
      created_at: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: DataTypes.NOW 
      },
      updated_at: { 
        type: DataTypes.DATE, 
        allowNull: true 
      },
      deleted_at: { 
        type: DataTypes.DATE, 
        allowNull: true 
      }
    }, { 
      sequelize, 
      tableName: 'record_entries', 
      timestamps: false 
    });
  }

  static associate(models) {
    this.belongsTo(models.RecordBook, { foreignKey: 'record_book_id', as: 'record_book' });
    this.hasMany(models.RecordImage, { foreignKey: 'entry_id', as: 'images' });
  }
}

class RecordImage extends Model {
  static init(sequelize) {
    return super.init({
      image_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      entry_id: { 
        type: DataTypes.INTEGER, 
        references: { model: 'record_entries', key: 'entry_id' }
      },
      image_url: { 
        type: DataTypes.TEXT, 
        allowNull: false 
      }
    }, { 
      sequelize, 
      tableName: 'record_images', 
      timestamps: false 
    });
  }

  static associate(models) {
    this.belongsTo(models.RecordEntry, { foreignKey: 'entry_id', as: 'entry' });
  }
}


module.exports = { RecordBook, RecordBookSurgery, RecordEntry, RecordImage };