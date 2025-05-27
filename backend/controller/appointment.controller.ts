import { Request, Response } from 'express';
import { Appointment } from '../model/appointment.model';
import responseLib from '../lib/responseLib';

/**
 * @desc    Get all appointments for the logged-in user
 * @route   GET /api/appointments
 * @access  Private
 */

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find({ userId: req?.user?.id });

    const response = responseLib.generateApiResponse(false, { appointments }, 'Appointments retrived succefully', undefined)
    return res.status(200).send(response)
  } catch (error) {
    const response = responseLib.generateApiResponse(true, null, 'Failed to fetch appointments', undefined)
    return res.status(500).send(response)

  }
};


/**
 * @desc    Create a new appointment for the logged-in user
 * @route   POST /api/appointments
 * @access  Private
 */

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = new Appointment({ ...req.body, userId: req?.user?.id });
    await appointment.save();
    const response = responseLib.generateApiResponse(false, { appointment }, 'Appointments created succefully', undefined)
    return res.status(201).send(response)

  } catch (error) {
    const response = responseLib.generateApiResponse(true, null, 'Failed to create appointment', undefined)
    return res.status(500).send(response)

  }
};


/**
 * @desc    Update an existing appointment for the logged-in user
 * @route   PUT /api/appointments/:id
 * @access  Private
 */

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const updated = await Appointment.findOneAndUpdate(
      { _id: req.params.id, userId: req?.user?.id },
      req.body,
      { new: true }
    );
    if (!updated) {
      const response = responseLib.generateApiResponse(true, null, 'Appointment not found or unauthorized', undefined)
      return res.status(404).send(response)


    }

    const response = responseLib.generateApiResponse(false, updated, 'Appointment update succefully', undefined)
    return res.status(200).send(response)

  } catch (error) {
    const response = responseLib.generateApiResponse(true, null, 'Failed to update appointment', undefined)
    return res.status(500).send(response)

  }
};

/**
 * @desc    Delete an appointment of the logged-in user
 * @route   DELETE /api/appointments/:id
 * @access  Private
 */

export const deleteAppointment = async (req: Request, res: Response) => {
  try {

    console.log(req)
    const deleted = await Appointment.findOneAndDelete({ _id: req.params.id, userId: req?.user?.id });
    if (!deleted) {
      const response = responseLib.generateApiResponse(true, null, 'Appointment not found or unauthorized', undefined)
      return res.status(404).send(response)


    }
    const response = responseLib.generateApiResponse(false, {}, 'Appointment deleted succefully', undefined)
    return res.status(200).send(response)


  } catch (error) {
    const response = responseLib.generateApiResponse(true, null, 'Failed to delete appointment', undefined)
    return res.status(500).send(response)

  }
};
