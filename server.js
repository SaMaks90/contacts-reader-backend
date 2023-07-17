const mongoose = require('mongoose');

require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 3000;

const DB_HOST = process.env.DB_HOST;

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
    .then(() => app.listen(PORT))
    .catch(e => {
        console.log(e.message);
        process.exit(1);
    });

