const express = require('express');

const ctrl = require('../../controllers/auth');
const { schemas } = require('../../models/user');
const { validateBody, authenticate, isValidId } = require('../../middlewares');

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/:id/subscription', authenticate, isValidId, validateBody(schemas.updateSchema), ctrl.updateSubscription);

module.exports = router;