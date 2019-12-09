const router = require('express').Router();

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

router.get('/', (req, res) => {
    Messages.getMessages()
        .then(messages => {
            res.status(200).json(messages)
        })
        .catch(err => {
            console.log('GETTING DECKS ERR', err)
            res.status(500).json({error: 'there was an error retrieving the messages'})
        })
})

module.exports = router;