import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentRepository',
  AppointmentRepository,
);

container.registerSingleton<IUsersRepository>('UserRepository', UserRepository);
