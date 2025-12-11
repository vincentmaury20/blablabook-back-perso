import Joi from "joi";

export const authorSchema = Joi.object({
   name: Joi.string().min(2).max(30).required(),
   firstname: Joi.string().min(2).max(30).required(),
   bio: Joi.string().max(500).required(),
}).unknown();