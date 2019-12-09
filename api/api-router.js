const router = require("express").Router();

const authRouter = require('../auth/auth-router');
const messageRouter = require('../routes/messagesRouter')
router.use('/auth', authRouter);
router.use('/messages', messageRouter);

module.exports = router;