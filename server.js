const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Contact = require('./models/Contact');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*'
}));

mongoose
  .connect('mongodb://localhost/contactform', { useNewUrlParser: true, useUnifiedTopology: true });

const createContact = async (data) => {
  const contact = new Contact(data);
  await contact.save();
};

const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'harvey73@ethereal.email',
        pass: 'QvRye2EZcsxHZUD6nX'
    }
  });
};

const sendEmail = async (transporter, data) => {
  await transporter.sendMail({
    from: '"Test ethereal user" <harvey73@ethereal.email>',
    to: "harvey73@ethereal.email",
    subject: "New Contact Form Submission",
    text: JSON.stringify(data, null, 2),
  });
};

app.post('/api/contacts', async (req, res) => {
  try {
    const transporter = createTransporter();

    await Promise.all([
      createContact(req.body),
      sendEmail(transporter, req.body)
    ]);

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error', error: error.message });
  }
});

module.exports = app;
