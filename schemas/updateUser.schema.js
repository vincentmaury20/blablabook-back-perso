// schemas/updateUser.schema.js
import Joi from "joi";

export const updateUserSchema = Joi.object({
   name: Joi.string().trim().min(2),
   firstname: Joi.string().trim().min(2),
   age: Joi.number().integer().min(13).max(120),
   email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }),
   avatar: Joi.string().optional(),
   role: Joi.string().valid('admin', 'user').optional(),
   books: Joi.array().items(Joi.number().integer()).optional()
});