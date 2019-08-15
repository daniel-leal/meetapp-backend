import express from 'express';

import 'express-async-errors';
import routes from './routes';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App();
