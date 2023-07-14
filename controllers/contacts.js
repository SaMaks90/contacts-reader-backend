const { HttpError, ctrlWrapper } = require('../helpers');

const contacts  = require('../models/contacts');

const getAllContacts = async (req, res) => {
    const result = await contacts.getAllContacts();
    res.json(result);
}

const getContactById = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if(!result) {
        throw HttpError(404, 'Not found');
    }
    res.json(result);
}

const addContact = async (req, res) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
}

const deleteContact = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if(!result) {
        throw HttpError(404, 'Not found');
    }
    res.status(200).json({ message: 'Contact deleted' });
}

const updateContactById = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.updateContactById(id, req.body);
    if(!result) {
        throw HttpError(404, 'Not found');
    }
    res.status(201).json(result);
}

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    deleteContact: ctrlWrapper(deleteContact),
    updateContactById: ctrlWrapper(updateContactById)
}