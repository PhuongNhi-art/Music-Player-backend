const express = require('express');
const router = express.Router();
const verifyToken = require('./verifyToken');
const AlbumCategoryController = require('../controllers/AlbumCategoryController');
const AlbumController = require('../controllers/AlbumController');
//Geting all
// router.get('/',verifyToken, (req,res)=>{
//     res.send('Hello word')
// })
router.get('/', AlbumCategoryController.getAll)
//Geting one
router.get('/:idCategory', AlbumController.getByIdCategory)
//creating one
router.post('/', AlbumCategoryController.createAlbumCategory)
//update one
router.patch('/', AlbumCategoryController.updateAlbumCategory);

router.delete('/:id', AlbumCategoryController.deleteAlbumCategory);
module.exports = router;