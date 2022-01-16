import { Router } from 'express';

import appointmentRouter from '@modules/appointments/infra/http/routes/appointment.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';
import userRouter from '@modules/users/infra/http/routes/user.routes';

const routes = Router();

routes.use('/appointments', appointmentRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);

export default routes;
