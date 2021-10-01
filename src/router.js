   
const express = require('express');
const router = express.Router();
const userRoute = require('./routes/userRouter');
const albumRoute = require('./routes/albumRouter');
const categoryRoute = require('./routes/albumCategoryRouter');
const songRoute = require('./routes/songRouter');
const artistRoute = require('./routes/artistRouter');
const typeRoute = require('./routes/typeRouter');
router.use('/user',userRoute);
router.use('/category',categoryRoute);
router.use('/album', albumRoute);
router.use('/song', songRoute);
router.use('/artist', artistRoute);
router.use('/type', typeRoute);
module.exports = router;