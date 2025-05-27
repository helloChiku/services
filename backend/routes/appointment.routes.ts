import express from 'express';
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment
} from '../controller/appointment.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { appointmentSchema , updateAppointmentSchema} from '../middleware/validate.middleware';

const router = express.Router();

router.use(verifyToken);
router.get('/', getAppointments);
router.post('/', validate(appointmentSchema), createAppointment);
router.put('/:id', validate(updateAppointmentSchema), updateAppointment);
router.delete('/:id', deleteAppointment);

export default router;