import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    // COLOCA SEMPRE HORARIO 0 NA DATA
    const appointmentDate = startOfHour(date);

    // verificar se a data esta disponivel
    const findAppoitmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    // SE A DATA JA ESTIVER MARCADA RETORNA O ERRO
    if (findAppoitmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
