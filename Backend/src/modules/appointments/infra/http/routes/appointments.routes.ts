import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.post('/', appointmentsController.create);

export default appointmentRouter;
