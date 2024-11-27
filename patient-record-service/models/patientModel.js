const Joi = require("joi");

const patientSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().min(0).required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  contact: Joi.string().required(),
  address: Joi.string().required(),
  medicalHistory: Joi.array().items(Joi.string()),
  prescriptions: Joi.array().items(
    Joi.object({
      drug: Joi.string().required(),
      dosage: Joi.string().required(),
      frequency: Joi.string().required(),
    }),
  ),
  labResults: Joi.array().items(
    Joi.object({
      testName: Joi.string().required(),
      date: Joi.string().required(),
      result: Joi.string().required(),
    }),
  ),
});

module.exports = { patientSchema };
