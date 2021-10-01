require('dotenv').config();
const AlbumCategory = require('../models/CategoryModel');
const Album = require('../models/AlbumModel');
class AlbumCategoryController {
    async getAll(req, res) {
        try {
            // const albumCategories = await AlbumCategory.find();
            // const {userId} = req.body;
            let albumCategories = await AlbumCategory.aggregate([
                {
                    $lookup: {
                        from: 'albums',
                        as : 'albums',
                        let : {idCategory: "$_id"},
                        pipeline: [{$match: {$expr: {$eq: ['$idCategory','$$idCategory']}}}]
                    }
                }
            ]).exec();
            return res.json({
                message: albumCategories
            })
        }
        catch (e) {
            return res.status(404).json({
                message: e.message
            })
        }
    }
    async getByIdAlbumCategory(req, res) {
        try {
            const {id} = req.params;
            const albumCategory = await AlbumCategory.findById(id);
            return res.json({
                message: albumCategory
            })
        }
        catch (e) {
            return res.status(404).json({
                message: e.message
            })
        }
    }
    async createAlbumCategory(req, res){
        try {
            const albumCategory = new AlbumCategory({
                title: req.body.title,
                description: req.body.description,
            });
            console.log('hello');
            const savedAlbumCategory = await albumCategory.save();
            return res.json({
                message: savedAlbumCategory
            })
        } catch (e) {
            return res.status(404).json({
                message: e.message
            })
        }
    }
    async deleteAlbumCategory(req, res) {
        try {
            const {id} = req.params;
            const removedAlbumCategory = await AlbumCategory.remove({_id: id});
            return res.json({
                message: 'Delete successful'
            })
        } catch (error) {
            return res.status(404).json({
                message: e.message
            })
        }
    }
    async updateAlbumCategory(req, res) {
        try {
            const {id} = req.params;
            const updateAlbum = await AlbumCategory.updateOne({_id: id})
            return res.json({
                message:  updateAlbum
            })
        } catch (e) {
            return res.status(404).json({
                message: e.message
            })
        }
    }
}
module.exports = new AlbumCategoryController();