import { Router } from 'express';

import SessionController from '@modules/users/infra/http/controllers/SessionController';

const sessionRouter = Router();
const sessionController = new SessionController();

sessionRouter.post('/', sessionController.create);

export default sessionRouter;
