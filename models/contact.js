const Joi = require('joi');
const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../helpers')

const emailRegexp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: emailRegexp,
        required: true
    },
    favorite: {
        type: Boolean,
        default: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

contactSchema.post('save', handleMongooseError);

const Contact = model('contact', contactSchema);

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().pattern(emailRegexp).required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean()
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
});

const schemas = {
    addSchema,
    updateFavoriteSchema
}

module.exports = {
    Contact,
    schemas
};