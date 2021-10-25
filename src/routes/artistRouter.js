const express = require('express');
const router = express.Router();
const ArtistController = require('../controllers/ArtistController');
//Geting all
// router.get('/',verifyToken, (req,res)=>{
//     res.send('Hello word')
// })
router.get('/', ArtistController.getAll)
//Geting one
router.get('/:id', ArtistController.getByIdArtist)


//creating one
router.post('/', ArtistController.createArtist)
//update one
// router.patch('/', SongController.updateSong);

// router.delete('/:id', SongController.deleteSong);
module.exports = router;