const { Contact } = require('../models/contact');
const { HttpError, ctrlWrapper } = require('../helpers');

const getAllContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10, favorite = null } = req.query;
    const skip = (page - 1) * limit;
    let findOptions = {
        owner
    }
    if(favorite !== null) {
        findOptions['favorite'] = favorite;
    }
    const result = await Contact.find(findOptions, '-createdAt -updatedAt -owner', { skip, limit }).populate('owner', '-_id -createdAt -updatedAt -password -token');
    res.json(result);
}

const getContactById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if(!result) {
        throw HttpError(404, 'Not found');
    }
    res.json(result);
}

const addContact = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
}

const updateContactById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if(!result) {
        throw HttpError(404, 'Not found');
    }
    res.status(201).json(result);
}

const updateFavorite = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if(!result) {
        throw HttpError(404, 'Not found');
    }
    res.status(201).json(result);
}

const deleteContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if(!result) {
        throw HttpError(404, 'Not found');
    }
    res.status(200).json({ message: 'Contact deleted' });
}

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContactById: ctrlWrapper(updateContactById),
    updateFavorite: ctrlWrapper(updateFavorite),
    deleteContact: ctrlWrapper(deleteContact)
}