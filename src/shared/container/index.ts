import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentRepository',
  AppointmentRepository,
);

container.registerSingleton<IUsersRepository>('UserRepository', UserRepository);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
