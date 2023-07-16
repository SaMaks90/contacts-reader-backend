const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const getAllContacts = async () => {
    // const data = await fs.readFile(contactsPath);
    // return  JSON.parse(data);
}

const getContactById = async id => {
    // const allContacts = await getAllContacts();
    // const contact = allContacts.find(elem => elem.id === id);
    // return contact || null;
}

const addContact = async data => {
    // const newContact = {
    //     id: nanoid(),
    //     ...data
    // }
    // const allContacts = await getAllContacts();
    // allContacts.push(newContact);
    // await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

    // return newContact;
}

const updateContactById = async (id, data) => {
    // const contacts = await getAllContacts();
    // const index = contacts.findIndex(elem => elem.id === id);
    // if(index === -1) {
    //     return null;
    // }
    // contacts[index] = {id, ...data};
    // await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    // return contacts[index];
}

const removeContact = async id => {
    // const contacts = await getAllContacts();
    // const index = contacts.findIndex(elem => elem.id === id);
    // if(index === -1) {
    //     return null;
    // }
    // const [result] = contacts.splice(index, 1);
    // await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    // return result;
}

module.exports = {
    getAllContacts,
    getContactById,
    addContact,
    updateContactById,
    removeContact
}