const db = require('../config/db-config');

module.exports = {
    addSender,
    addMessage,
    getMessages,
    getByEmail,
    getSenderById,
    getMessageById
};

function getByEmail(email) {
    return db('senders')    
            .where('senderEmail', '=', email)
}
async function addSender(senderInfo){
    const sender = await db('senders as s')
                    .where({senderEmail: senderInfo.senderEmail})
                    .first()
    // console.log(senderInfo)
    if (!sender) {
        return db('senders')
                .insert(senderInfo, 'id')
                .then(([id]) => getSenderById(id))
    } else {
        return sender
    }
};

function getSenderById(id){
    return db('senders')
            .where({id})
            .select('id', 'senderName', 'senderEmail')
            .first()
}

function addMessage(message){
    return db('messages')
        .insert(message, 'id')
        .where('sender_id', '=', message.sender_id)
};

function getMessages(){
    return db.select('m.id as message_id', 's.senderName', 's.senderEmail', 'm.subject', 'm.message')
            .from('senders as s')
            .join('messages as m', 's.id', '=', 'm.sender_id')
};

function getMessageById(id){
    return db.select('m.id as message_id', 's.senderName', 's.senderEmail', 'm.subject', 'm.message')
            .from('messages as m')
            .where('m.id', '=', id)
            .join('senders as s', 's.id', '=', 'm.sender_id')
            .first()
}