const Joi = require('joi');
const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../helpers');

const emailRegexp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const subscriptionList = ['starter', 'pro', 'business'];

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: emailRegexp,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        minLength: 6,
        required: [true, 'Set password for user']
    },
    subscription: {
        type: String,
        enum: subscriptionList,
        default: 'starter'
    },
    token: {
        type: String,
        default: ''
    }
}, {
    versionKey: false,
    timestamps: true
});

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    description: Joi.string().valid(...subscriptionList)
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required()
});

const updateSchema = Joi.object({
    subscription: Joi.string().valid(...subscriptionList).required()
})

const schemas = {
    registerSchema,
    loginSchema,
    updateSchema
};

module.exports = {
    schemas,
    User
}