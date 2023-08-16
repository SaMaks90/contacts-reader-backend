const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

const { User } = require('../models/user');
const { HttpError, ctrlWrapper, sendEmails } = require('../helpers');
const { SECRET_KEY, BASE_URL } = process.env;

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(user) {
        throw HttpError(409, 'Email in use');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarUrl = gravatar.url(email);
    const verificationCode = nanoid();

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarUrl, verificationCode });
    const verifyEmail = {
        to: email,
        subject: 'Verify email',
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`
    };

    await sendEmails(verifyEmail);

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
            avatarUrl: newUser.avatarUrl
        }
    })
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(!user) {
        throw HttpError(401, 'Email or password is wrong');
    }

    if(!user.verify) {
        throw HttpError(401, 'Email not verified');
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, 'Email or password is wrong');
    }

    const payload = {
        id: user._id
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
    await User.findByIdAndUpdate(user._id, { token })
    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    });
}

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;

    res.json({
        email,
        subscription
    });
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });

    res.status(204).json({
        message: 'Logout success'
    });
}

const updateSubscription = async (req, res) => {
    const { subscription } = req.body;
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { subscription });

    res.json({
        message: 'Update user subscription'
    });
}

const uploadAvatar = async (req, res) => {
    const { _id: id } = req.user;
    const avatarUrl = req.avatarUrl;
    await User.findByIdAndUpdate(id, { avatarUrl });

    res.json({
        avatarUrl
    });
}

const verifyEmail = async (req, res) => {
    const { verificationCode } = req.params;
    const user = await User.findOne({ verificationCode });

    if(!user) {
        throw HttpError(401, 'Email not found');
    }

    await User.findByIdAndUpdate(user._id, { verify: true, verificationCode: '' });

    res.json({
        message: 'Email verify success'
    })
}

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if(!user) {
        throw HttpError(401, 'Email not found')
    }

    if(user.verify) {
        throw HttpError(401, 'Email already verify')
    }

    const verifyEmail = {
        to: email,
        subject: 'Verify email',
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click verify email</a>`
    };

    await sendEmails(verifyEmail);

    res.json({
        message: 'Verify email send success'
    })
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription),
    uploadAvatar: ctrlWrapper(uploadAvatar),
    verifyEmail: ctrlWrapper(verifyEmail),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail)
}