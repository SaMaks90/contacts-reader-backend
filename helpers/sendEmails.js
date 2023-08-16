const sgMail = require('@sendgrid/mail');

const { SENDGRID_API } = process.env;

sgMail.setApiKey(SENDGRID_API);

const sendEmails = async data => {
    const email = { ...data, from: 'samchenkoms@gmail.com' };
    await sgMail.send(email);
    return true;
}

module.exports = sendEmails;