const express = require('express');
const router = express.Router();
const TypeController = require('../controllers/TypeController');
//Geting all
// router.get('/',verifyToken, (req,res)=>{
//     res.send('Hello word')
// })
router.get('/', TypeController.getAll)
//Geting one
// router.get('/:id', SongController.getByIdSong)


//creating one
router.post('/', TypeController.createType)
//update one
// router.patch('/', SongController.updateSong);

// router.delete('/:id', SongController.deleteSong);
module.exports = router;