const { DataTypes, Model } = require('sequelize')

class QuestionTicket extends Model {
  static init(sequelize) {
    return super.init({
      ticket_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      user_id: { 
        type: DataTypes.INTEGER, 
        references: { model: 'users', key: 'user_id' } 
      },
      payment_id: { 
        type: DataTypes.STRING(36), 
        allowNull: true,
        references: { model: 'payments', key: 'payment_id' }
      },
      ticket_type: { 
        type: DataTypes.ENUM('FREE', 'PAID'), 
        allowNull: false 
      },
      ticket_status: { 
        type: DataTypes.ENUM('ACTIVE', 'USED', 'REFUNDED', 'EXPIRED'), 
        allowNull: false, 
        defaultValue: 'ACTIVE' 
      },
      issued_at: { 
        type: DataTypes.DATE, 
        allowNull: false 
      },
      expires_at: { 
        type: DataTypes.DATE, 
        allowNull: true 
      },
      used_at: { 
        type: DataTypes.DATE, 
        allowNull: true 
      }
    }, { 
      sequelize, 
      tableName: 'question_tickets', 
      timestamps: false 
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Payment, { foreignKey: 'payment_id', as: 'payment' });
    this.hasMany(models.Question, { foreignKey: 'ticket_id', as: 'questions' });
    this.hasMany(models.RefundTicket, { foreignKey: 'ticket_id', as: 'refund_tickets' });
  }
}

module.exports = QuestionTicket;