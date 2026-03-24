import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  firstname: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "fr"] } })
    .required(),
  role: Joi.string().valid("admin", "user").required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least 6 characters, one lowercase letter, one uppercase letter and one special character.",
    }),
  avatar: Joi.string().allow("").optional(),
  age: Joi.number().integer().min(0).max(120).optional(),
}).unknown();
