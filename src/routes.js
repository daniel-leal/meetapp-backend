import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

// Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import MeetupController from './app/controllers/MeetupController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

// Validators
import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';

import validateMeetup from './app/validators/Meetup';

const routes = new Router();

const upload = multer(multerConfig);

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
routes.post('/files', upload.single('file'), FileController.store);

/**
 * Meetup CRUD
 */
routes.get('/meetups', MeetupController.index);
routes.post('/meetups', validateMeetup, MeetupController.store);
routes.put('/meetups/:id', validateMeetup, MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);

export default routes;
