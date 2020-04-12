const router = require('express').Router();
const nodemailer = require('nodemailer');
const Messages = require('../models/messages-model');


// POST TO SEND A MESSAGE TO THE DB
router.post('/', (req, res) => {
   const senderBody = {senderName: req.body.senderName, senderEmail: req.body.senderEmail};
   
   Messages.addSender(senderBody)
        .then(sender => {
            const sender_id = sender.id
            const messageBody = {subject: req.body.subject, message: req.body.message, sender_id: sender_id}
            Messages.addMessage(messageBody)
                .then(messageId => {
                    Messages.getMessageById(messageId[0])
                        .then(message => {
                            res.status(201).json(message)
                        })
                })
        })
        .catch(err => {
            console.log(err, 'POST MESSAGE ERR')
            res.status(500).json({error: 'the server failed to add the message'})
        });
});

router.post(process.env.CONTACT, (req, res) => {
    const smtpTrans = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });

    const mailOpts = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: `from portfolio: ${req.body.subject}`,
        text: `${req.body.senderName}: ${req.body.senderEmail} says ${req.body.message}` 
    }
    
    smtpTrans.sendMail(mailOpts, (error, response) => {
        if (error) {
            console.log(error)
            res.json('contact-failure')
        } else {
            res.json('contact-success')
        }
    })
})
// GET ALL MESSAGES
router.get('/', (req, res) => {
    Messages.getMessages()
        .then(messages => {
            res.status(200).json(messages)
        })
        .catch(err => {
            console.log('GETTING MESSAGES ERR', err)
            res.status(500).json({error: 'there was an error retrieving the messages'})
        })
})

module.exports = router;