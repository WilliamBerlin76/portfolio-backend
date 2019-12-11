const router = require("express").Router();

const authRouter = require('../auth/auth-router');
const messageRouter = require('../routes/messagesRouter')
router.use(`${process.env.API_AUTH_ROUTE}`, authRouter);
router.use(`${process.env.API_MESSAGES_ROUTE}`, messageRouter);

module.exports = router;