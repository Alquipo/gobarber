import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

const appointmentRouter = Router();

const appointments: Appointment[] = [];

appointmentRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  // CONVERTE PARA DATA E INICIA COM HORA ZERADA
  const parsedDate = startOfHour(parseISO(date));

  // PERCORRE O ARRAY DE APPOINTMENT PARA COMPARAR AS DATAS
  const findAppoitmentInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  // SE A DATA JA ESTIVER MARCADA RETORNA O ERRO
  if (findAppoitmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = new Appointment(provider, parsedDate);

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentRouter;
