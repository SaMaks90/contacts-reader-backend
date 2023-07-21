const mongoose = require('mongoose');
require('dotenv').config();

const { PORT = 3000, DB_HOST } = process.env;

const app = require('./app');

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
    .then(() => {
        console.log('Database connection successful');
        app.listen(PORT);
    })
    .catch(e => {
        console.log(e.message);
        process.exit(1);
    });

