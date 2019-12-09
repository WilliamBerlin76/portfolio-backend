const router = require('express').Router();

const Messages = require('../models/messages-model');

router.post('/', (req, res) => {
   const senderBody = {senderName: req.body.senderName, senderEmail: req.body.senderEmail};
   
   
//    console.log(senderBody, messageBody)
   Messages.addSender(senderBody)
        .then(sender => {
            const sender_id = sender.id
            const messageBody = {subject: req.body.subject, message: req.body.message, sender_id: sender_id}
            console.log(messageBody)
            // console.log(sender_id, 'sender_id from endpoint')
            Messages.addMessage(messageBody)
                .then(message => {
                    res.status(201).json({confirmation: 'the message has been sent'})
                })
        })
        .catch(err => {
            console.log(err, 'POST MESSAGE ERR')
            res.status(500).json({error: 'the server failed to add the message'})
        })
})

module.exports = router;