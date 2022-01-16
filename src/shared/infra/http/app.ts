import 'reflect-metadata';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from '@shared/infra/http/routes';

import '@shared/infra/database';
import '@shared/container';

dotenv.config();
const app = express();

app.use(express.json());

// CORS
app.use(cors());

// SWAGGER
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(
    swaggerJsdoc({
      definition: {
        components: {},
        openapi: '3.0.0',
        info: {
          title: 'SANEAGO - SANSIG',
          description: 'API SANSIG',
          contact: {
            name: 'MEX6251 - CARLOS ALEXANDRE',
            email: 'carlosalexandre@saneago.com.br',
          },
          version: '1.0.0',
        },
      },
      apis: ['./src/modules/**/routes/*.ts'],
    }),
  ),
);

// ROUTES
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

// ERRORS
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

export default app;
