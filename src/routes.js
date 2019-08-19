import { Router } from 'express';

// Controllers
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/', (req, res) =>
  res.json({ status: 'ok', version: 1.0, app: 'MeetaApp!' })
);

routes.post('/users', UserController.store);

export default routes;
