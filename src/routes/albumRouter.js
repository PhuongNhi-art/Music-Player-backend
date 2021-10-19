const express = require('express');
const router = express.Router();
const verifyToken = require('./verifyToken');
const AlbumController = require('../controllers/AlbumController');
//Geting all
// router.get('/',verifyToken, (req,res)=>{
//     res.send('Hello word')
// })
router.get('/', AlbumController.getAll)
//Geting one
router.get('/:id', AlbumController.getByIdAlbum)

router.get('/getfirst/:idAlbum', AlbumController.getTheFirstSong)
//creating one
router.post('/', AlbumController.createAlbum)
//update one
router.patch('/', AlbumController.updateAlbum);

router.delete('/:id', AlbumController.deleteAlbum);
module.exports = router;