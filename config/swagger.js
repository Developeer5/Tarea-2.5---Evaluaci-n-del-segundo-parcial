import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Clientes',
      version: '1.0.0',
      description: 'Documentación de la API RESTful para gestión de clientes'
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
    // Se quitó el bloque 'security' global para evitar candados en Auth
  },
  apis: ['./routes/*.js']
}

const swaggerSpec = swaggerJSDoc(options)

export { swaggerUi, swaggerSpec }