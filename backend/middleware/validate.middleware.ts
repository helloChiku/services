import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import {errorHandler} from './error.middleware'
export const signupSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
   contact: Joi.string()
    .pattern(/^\+\d{10,15}$/) 
    .optional()
    .messages({
      'string.pattern.base': 'Phone number must be in international format, e.g. +919999999999',
    }),
  password: Joi.string().min(6).required()
});

export const loginSchema = Joi.object({
   email: Joi.string().email().required(),
  password: Joi.string().required()
});
export const forgotPasswordSchema = Joi.object({
   email: Joi.string().email().required(),
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().required()
})

export const appointmentSchema = Joi.object({
  title: Joi.string().min(1).required(),
  description: Joi.string().optional(),
  dateTime: Joi.date().iso().required(),
  duration: Joi.number().positive().required(),

  location: Joi.object({
    type: Joi.string().valid('Point').required(),
    coordinates: Joi.array()
      .items(Joi.number().min(-180).max(180))
      .length(2)
      .required(), // [longitude, latitude]
    address: Joi.string().optional()
  }).optional()
});



export const updateAppointmentSchema = Joi.object({
  id: Joi.string().allow(),
  title: Joi.string().min(1),
  description: Joi.string(),
  dateTime: Joi.date().iso(),
  duration: Joi.number().positive()
});


/**
 * @desc    Middleware to validate request body using Joi schema
 * @access  Depends on route
 */

export const validate = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
const { error}  = schema.validate(req.body, { abortEarly: false });
console.log(error,"errr")

if(!error){
  return next()
  
}
  
const err = new Error(error?.details.map(detail => detail.message)?.[0]) as any;
  err.status = 400
  errorHandler(err, req, res, next)

  
};

