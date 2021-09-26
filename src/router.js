   
const express = require('express');
const router = express.Router();
const userRouter = require('./routes/userRouter');
const albumRouter = require('./routes/albumRouter');
router.use('/user',userRouter);
router.use('/album', albumRouter);
module.exports = router;