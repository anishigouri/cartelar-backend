import { Router } from 'express';
import multer from 'multer';
import UsersController from 'controllers/UsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();

usersRouter.get('/', usersController.findAll);

usersRouter.post('/', usersController.save);

usersRouter.get('/:id', usersController.findById);

usersRouter.get('/forgot-password/:email', usersController.forgotPassword);

usersRouter.post('/reset-password', usersController.resetPassword);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersController.updateAvatar,
);

export default usersRouter;
