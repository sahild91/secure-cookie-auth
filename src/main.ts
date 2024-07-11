import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { cfg } from './utils/env';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as fs from 'fs';
import * as https from 'https';

async function bootstrap() {
  const server = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  
  // Enable CORS
  app.enableCors({
    origin: cfg.cors.whitelist,
    credentials: true,
  });

  // Apply Helmet for basic security
  app.use(helmet());

  // Rate Limiting
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // HTTPS setup
  const httpsOptions = {
    key: fs.readFileSync(cfg.server.keyPath),
    cert: fs.readFileSync(cfg.server.certPath),
  };
  const httpsServer = https.createServer(httpsOptions, server);

  // Start the server with HTTPS
  httpsServer.listen(cfg.server.port, () => {
    console.log(`Server is running on https://localhost:${cfg.server.port}`);
  });
}

bootstrap();
