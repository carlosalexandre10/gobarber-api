import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http//middlewares/ensureAuthenticated';

import UserAvatarController from '../controllers/UserAvatarController';
import UserController from '../controllers/UserController';

const userRouter = Router();
const upload = multer(uploadConfig);
const userController = new UserController();
const userAvatarController = new UserAvatarController();

userRouter.post('/', userController.create);

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default userRouter;
