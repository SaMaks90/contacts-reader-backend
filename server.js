const mongoose = require('mongoose');

const app = require('./app');

const { PORT = 3000, DB_HOST } = process.env;

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

