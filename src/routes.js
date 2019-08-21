import { Router } from 'express';

// Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import MeetupController from './app/controllers/MeetupController';

import authMiddleware from './app/middlewares/auth';

// Validators
import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';

import validateMeetup from './app/validators/Meetup';

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

/**
 * Meetup
 */
routes.get('/meetups', MeetupController.index);
routes.post('/meetups', validateMeetup, MeetupController.store);
routes.put('/meetups/:id', validateMeetup, MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);

export default routes;
