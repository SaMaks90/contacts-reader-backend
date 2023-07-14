const mongoose = require('mongoose');

require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 3000;

const DB_HOST = process.env.DB_HOST;

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
    .then(() => console.log('Database connect success'))
    .catch(e => console.log(e.message));

app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
});