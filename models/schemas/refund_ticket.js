const { DataTypes, Model } = require('sequelize');

class RefundTicket extends Model {
  static init(sequelize) {
    return super.init({
      refund_ticket_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      refund_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'refunds',
          key: 'refund_id'
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
        }
      },
      ticket_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'question_tickets',
          key: 'ticket_id'
        }
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    }, {
      sequelize,
      tableName: 'refund_tickets',
      timestamps: false
    });
  }

  static associate(models) {
    this.belongsTo(models.Refund, { foreignKey: 'refund_id', as: 'refund' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.QuestionTicket, { foreignKey: 'ticket_id', as: 'ticket' });
  }
}

module.exports = RefundTicket;