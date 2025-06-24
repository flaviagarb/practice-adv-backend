import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.4',
    info: {
      title: 'Nodepop API',
      version: '1.0.0',
    },
  },
  apis: ['swagger.yaml'],
};

const specification = swaggerJSDoc(options);
export default [swaggerUI.serve, swaggerUI.setup(specification)];