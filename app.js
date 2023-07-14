const cors = require('cors');
const express = require('express');
const contactsRouter= require('./routes/api/contacts');
const logger = require('morgan');
const moment = require('moment');
const fs = require('fs/promises');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.use(async (req, res, next) => {
    const { url, method } = req;
    const date = moment().format('DD-MM-YYYY_hh:mm:ss');
    await fs.appendFile('./public/server.log', `\n${method} ${url} ${date}`);
    next();
})

app.get('/', (req, res, next) => {
    res.json({ message: 'CORS is activated'});
});

app.use('/api/contacts', contactsRouter);

app.use((_, res, __) => {
    res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Use api on routes: /api/contacts',
        data: 'Not found',
    });
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Server error' } = err;
    res.status(status).json({
        message
    });
});

module.exports = app;