import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

import express from 'express';
import { DataSource } from 'typeorm';
import cookiesParser from 'cookie-parser';
import bodyParser from 'body-parser';

import { entities, errorMiddleware, router } from './src';
import path from 'path';

async function main() {
  try {
    const app = express();
    const PORT = process.env.PORT || 3003;
    const appDataSource = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST,
      // @ts-ignore
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities,
      // @ts-ignore
      synchronize: Boolean(process.env.DB_SYNC),
      logging: false,
    });

    await appDataSource.initialize();

    app.use(bodyParser.json());
    app.use(cookiesParser());

    app.use('/api', router);
    app.use(errorMiddleware);

    if (process.env.NODE_ENV === 'production') {
      app.use(
        '/',
        express.static(path.join(__dirname, '..', '..', 'client', 'build'))
      );
      app.get('*', (req, res) => {
        res.sendFile(
          path.join(__dirname, '..', '..', 'client', 'build', 'index.html')
        );
      });
      // app.get("*", (req, res) => {
      //   res.sendFile(path.resolve(__dirname, "502-page.html"));
      // });
    }

    app.listen(PORT, () => {
      console.log(`⚡️Server is running at http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

main();
