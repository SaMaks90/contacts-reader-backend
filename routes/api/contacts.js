const express = require('express');

const ctrl = require('../../controllers/contacts');

const { validateBody } = require('../../middlewares');

const schemas = require('../../schemas/contacts');

const router = express.Router();

router.get('/', ctrl.getAllContacts);

router.get('/:id', ctrl.getContactById);

router.post('/', validateBody(schemas.contactsSchema), ctrl.addContact);

router.delete('/:id', ctrl.deleteContact);

router.put('/:id', validateBody(schemas.contactsSchema), ctrl.updateContactById);

module.exports = router;