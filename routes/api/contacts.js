const express = require('express');

const ctrl = require('../../controllers/contacts');
const { schemas } = require('../../models/contact');
const { validateBody, isValidId } = require('../../middlewares');

const router = express.Router();

router.get('/', ctrl.getAllContacts);

router.get('/:id', isValidId, ctrl.getContactById);

router.post('/', validateBody(schemas.addSchema), ctrl.addContact);

router.put('/:id', isValidId, validateBody(schemas.addSchema), ctrl.updateContactById);

router.patch('/:id/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

router.delete('/:id', isValidId, ctrl.deleteContact);

module.exports = router;