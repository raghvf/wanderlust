const Joi = require("joi");

const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string()
            .trim()
            .min(3)
            .max(100)
            .required(),

        description: Joi.string()
            .trim()
            .allow(""),

        image: Joi.object({
            url: Joi.string()
                .uri()
                .allow("", null)
        }).default({}),

        price: Joi.number()
            .min(1)
            .required(),

        location: Joi.string()
            .trim()
            .required(),

        country: Joi.string()
            .trim()
            .required(),
    }).required()
});


const reviewSchema = Joi.object({
    review: Joi.object({

        rating: Joi.number()
            .integer()
            .min(1)
            .max(5)
            .required()
            .messages({
                "number.base": "Rating must be a number",
                "number.min": "Rating must be at least 1",
                "number.max": "Rating cannot exceed 5",
                "any.required": "Rating is required"
            }),

        comment: Joi.string()
            .trim()
            .min(5)
            .required()
            .messages({
                "string.empty": "Comment cannot be empty",
                "string.min": "Comment must be at least 5 characters",
                "any.required": "Comment is required"
            })

    }).required()
});

module.exports = {
    listingSchema,
    reviewSchema
};