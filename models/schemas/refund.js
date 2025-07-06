const { DataTypes, Model } = require('sequelize');

class Refund extends Model {
  static init(sequelize) {
    return super.init({
      refund_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      payment_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
          model: 'payments',
          key: 'payment_id'
        }
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'questions',
          key: 'question_id'
        }
      },
      refund_type: {
        type: DataTypes.ENUM('AUTO_48H', 'ADMIN_DELETE'),
        allowNull: false
      },
      refund_method: {
        type: DataTypes.ENUM('TICKET_ADD'),
        allowNull: false
      },
      refund_status: {
        type: DataTypes.ENUM('PENDING', 'COMPLETED'),
        allowNull: false,
        defaultValue: 'PENDING'
      },
      refund_reason: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      processed_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      processed_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'user_id'
        }
      }
    }, {
      sequelize,
      tableName: 'refunds',
      timestamps: false
    });
  }

  static associate(models) {
    this.belongsTo(models.Payment, { foreignKey: 'payment_id', as: 'payment' });
    this.belongsTo(models.Question, { foreignKey: 'question_id', as: 'question' });
    this.belongsTo(models.User, { foreignKey: 'processed_by', as: 'processed_by_user' });
    this.hasMany(models.RefundTicket, { foreignKey: 'refund_id', as: 'refund_tickets' });
  }
}

module.exports = Refund;