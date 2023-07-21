const express = require('express');

const ctrl = require('../../controllers/auth');
const { schemas } = require('../../models/user');
const { validateBody, authenticate, upload, uploadFileCloudinary } = require('../../middlewares');

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/subscription', authenticate, validateBody(schemas.updateSchema), ctrl.updateSubscription);

router.patch('/avatars', authenticate, upload.single('avatar'), uploadFileCloudinary, ctrl.uploadAvatar);

module.exports = router;