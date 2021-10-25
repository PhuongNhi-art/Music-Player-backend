require('dotenv').config();
const Artist = require('../models/ArtistModel');
const ObjectId = require('mongoose').Types.ObjectId
class ArtistController {
    async getAll(req, res) {
        try {
            const artists = await Artist.find();
            return res.json({
                message: artists
            })
        }
        catch (e) {
            return res.status(404).json({
                message: e.message
            })
        }
    }
    async getByIdArtist(req, res) {
        try {
            const { id } = req.params;
            let artist = await Artist.aggregate([
                {

                    $lookup: {
                        from: 'songs',
                        as: 'songs',
                        let: { idArtist: "$_id" },
                        pipeline: [{ $match: { $expr: { $eq: ['$idArtist', '$$idArtist'] } } }]
                    }
                },
                {
                    $match: {
                        _id: ObjectId(id)
                    }
                },
            ]).exec();
            return res.json({
                message: artist
            })
        }
        catch (e) {
            return res.status(404).json({
                message: e.message
            })
        }
    }
    async createArtist(req, res){
        try {
            const artist = new Artist({
                name: req.body.name,
                imageUri: req.body.imageUri,
            });
            const savedArtist = await artist.save();
            return res.json({
                message: savedArtist
            })
        } catch (e) {
            return res.status(404).json({
                message: e.message
            })
        }
    }
    
}
module.exports = new ArtistController();