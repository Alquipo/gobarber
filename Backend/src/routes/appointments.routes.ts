import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  // CONVERTE PARA DATA E INICIA COM HORA ZERADA
  const parsedDate = startOfHour(parseISO(date));

  const findAppoitmentInSameDate = appointmentsRepository.findByDate(
    parsedDate,
  );

  // SE A DATA JA ESTIVER MARCADA RETORNA O ERRO
  if (findAppoitmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = appointmentsRepository.create({
    provider,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentRouter;
