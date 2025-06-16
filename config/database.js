const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = sequelize;

// 연결 테스트 
const testConnection = async() => {
  try {
    await sequelize.authenticate();
    console.log('Sequelize 데이터베이스 연결 성공');
  } catch (error) {
    console.error('Sequelize 연결 실패: ', error.message);
  }
};

testConnection();