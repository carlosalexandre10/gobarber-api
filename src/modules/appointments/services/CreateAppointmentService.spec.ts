import AppError from '@shared/errors/AppError';

import AppointmentRepositoryFake from '../repositories/fakes/AppointmentRepositoryFake';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const appointmentRepositoryFake = new AppointmentRepositoryFake();
    const createAppointmentService = new CreateAppointmentService(
      appointmentRepositoryFake,
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '1233465567',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1233465567');
  });

  it('should not be able to create a new appointment on the same time', async () => {
    const appointmentRepositoryFake = new AppointmentRepositoryFake();
    const createAppointmentService = new CreateAppointmentService(
      appointmentRepositoryFake,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '1233465567',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '1233465567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
