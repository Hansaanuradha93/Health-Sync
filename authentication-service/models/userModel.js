const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required(),
  role: Joi.string().valid("user", "admin").default("user"),
  created_at: Joi.date(),
  updated_at: Joi.date(),
});

module.exports = { userSchema };