const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SYNCE API 명세',
      version: '1.0.0',
      description: 'SYNCE 프로젝트의 RESTful API 문서입니다.',
    },
    servers: [
      { url: 'https://synce.ngrok.app', description: 'ngrok 서버' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js', './swagger/*'],
};

const specs = swaggerJsdoc(options);

module.exports = { specs };