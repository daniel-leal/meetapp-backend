import { Router } from 'express';

// Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

// Validators
import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';

const routes = new Router();

routes.get('/', (req, res) =>
  res.json({ status: 'ok', version: 1.0, app: 'MeetaApp!' })
);

/**
 * Auth
 */
routes.post('/users', validateUserStore, UserController.store);
routes.post('/sessions', SessionController.store);

/**
 * Logged Users
 */
routes.use(authMiddleware);

routes.put('/users', validateUserUpdate, UserController.update);

export default routes;
