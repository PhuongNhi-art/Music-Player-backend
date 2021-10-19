const express = require('express');
const router = express.Router();
const SongController = require('../controllers/SongController');
//Geting all
// router.get('/',verifyToken, (req,res)=>{
//     res.send('Hello word')
// })
router.get('/', SongController.getAll)
//Geting one
router.get('/:id', SongController.getByIdSong)
router.get('/search/:key', SongController.search)

//creating one
router.post('/', SongController.createSong)
//update one
router.patch('/', SongController.updateSong);

router.delete('/:id', SongController.deleteSong);
module.exports = router;