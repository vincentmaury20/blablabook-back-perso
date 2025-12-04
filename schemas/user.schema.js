import Joi from "joi";

export const userSchema = Joi.object({
   name: Joi.string().min(2).max(30).required(),
   firstname: Joi.string().min(2).max(30).required(),
   email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }).required(),
   role: Joi.string().valid('admin', 'user').required(),
   password: Joi.string().min(8).max(200).required(),
   avatar: Joi.string().allow('').optional(),
   age: Joi.number().integer().min(0).max(120).optional()
}).unknown();

// il faudrait que je rajout un champ rôle et peut-être avec bouton radion dans le gabarit de création d'utilisateur ainsi qu'un premier password temporaire que le user pourra changer quand il se connectera la première fois 