import { getRepository, Repository } from 'typeorm';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

class AppointmentRepository implements IAppointmentsRepository {
  private ormRepostiry: Repository<Appointment>;

  constructor() {
    this.ormRepostiry = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepostiry.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepostiry.create({ provider_id, date });

    await this.ormRepostiry.save(appointment);

    return appointment;
  }
}

export default AppointmentRepository;
