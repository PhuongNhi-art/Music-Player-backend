require('dotenv').config();
const Song = require('../models/SongModel');
class SongController {
    async getAll(req, res) {
        try {
            const songs = await Song.find();
            return res.json({
                message: songs
            })
        }
        catch (e) {
            return res.status(404).json({
                message: e.message
            })
        }
    }
    async getByIdSong(req, res) {
        try {
            const {id} = req.params;
            const song = await Song.findById(id);
            return res.json({
                message: song
            })
        }
        catch (e) {
            return res.status(404).json({
                message: e.message
            })
        }
    }
    // async getByIdCategory(req, res) {
    //     try {
    //         const {idCategory} = req.params;
    //         const album = await Album.find({"idCategory": {"$in": idCategory}}).select();
    //         return res.json({
    //             message: album
    //         })
    //     }
    //     catch (e) {
    //         return res.status(404).json({
    //             message: e.message
    //         })
    //     }
    // }
    async createSong(req, res){
        try {
            const song = new Song({
                name: req.body.name,
                imageUri: req.body.imageUri,
                uri: req.body.uri,
                description: req.body.description,
                numberOfLikes: req.body.numberOfLikes,
                artists: req.body.artists,
                idType: req.body.idType,
                idAlbum: req.body.idAlbum,
            });
            const savedSong= await song.save();
            return res.json({
                message: savedSong
            })
        } catch (e) {
            return res.status(404).json({
                message: e.message
            })
        }
    }
    async deleteSong(req, res) {
        try {
            const {id} = req.params;
            const removedSong = await Song.remove({_id: id});
            return res.json({
                message: 'Delete successful'
            })
        } catch (error) {
            return res.status(404).json({
                message: e.message
            })
        }
    }
    async updateSong(req, res) {
        try {
            const {id} = req.params;
            const updateSong = await Song.updateOne({_id: id})
            return res.json({
                message:  updateSong
            })
        } catch (e) {
            return res.status(404).json({
                message: e.message
            })
        }
    }
}
module.exports = new SongController();