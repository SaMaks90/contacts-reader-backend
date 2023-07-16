const mongoose = require('mongoose');

// require('dotenv').config();

const app = require('./app');

// const PORT = process.env.PORT || 3000;

// const DB_HOST = process.env.DB_HOST;

mongoose.set('strictQuery', true);

mongoose.connect('mongodb+srv://user1:gYn1KKahxlWKtegE@mongosb.ae98jge.mongodb.net/contacts_reader?retryWrites=true&w=majority')
    .then(() => app.listen(3000))
    .catch(e => {
        console.log(e.message);
        process.exit(1);
    });

