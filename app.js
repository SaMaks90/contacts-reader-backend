const cors = require('cors');
const express = require('express');
const contactsRouter= require('./routes/api/contacts');
const authRouter = require('./routes/api/auth');
const logger = require('morgan');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.get('/', (req, res, next) => {
    res.json({ message: 'CORS is activated'});
});

app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter);

app.use((_, res, __) => {
    res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Use api on routes: /api/contacts || /api/auth',
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