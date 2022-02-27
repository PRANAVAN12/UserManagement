'use strict';
const Joi = require('@hapi/joi');

const createRequest = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  mobile: Joi.string().required(),
  address: Joi.string().required(),
  date_of_birth: Joi.date().required(),
  gender: Joi.string().valid('Male', 'Female').required(),

 
  password: Joi.string().min(3).max(15).required().label('Password'),
  password_confirmation: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' }),
}).options({ abortEarly: false });

const updateRequest = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  mobile: Joi.string().required(),
  address: Joi.string().required(),
  date_of_birth: Joi.date().required(),
  gender: Joi.string().valid('Male', 'Female').required(),

  password: Joi.string().min(3).max(15).required().label('Password'),
  password_confirmation: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' }),
}).options({ abortEarly: false });

module.exports.createRequest = createRequest;
module.exports.updateRequest = updateRequest;
