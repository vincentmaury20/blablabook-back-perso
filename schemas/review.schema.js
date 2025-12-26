import Joi from "joi";

export const reviewSchema = Joi.object({
   rating: Joi.number().integer().min(1).max(10),
   comment: Joi.string().max(5000).allow("").optional(),
   is_published: Joi.boolean().required()
});

