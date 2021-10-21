import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentController from '../controllers/AppointmentController';

const appointmentRouter = Router();
const appointmentsController = new AppointmentController();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.post('/', appointmentsController.create);

export default appointmentRouter;
