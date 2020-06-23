import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  provider: string;
  date: Date;
}

// Dependecy Inversion (SOliD)

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: RequestDTO): Appointment {
    // COLOCA SEMPRE HORARIO 0 NA DATA
    const appointmentDate = startOfHour(date);

    const findAppoitmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    // SE A DATA JA ESTIVER MARCADA RETORNA O ERRO
    if (findAppoitmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
