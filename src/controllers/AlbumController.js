require('dotenv').config();
const Album = require('../models/AlbumModel');
const Song = require('../models/SongModel');
const ObjectId = require('mongoose').Types.ObjectId
class AlbumController {
    async getAll(req, res) {
        try {
            const albums = await Album.find();
            return res.json({
                message: albums
            })
        }
        catch (e) {
            return res.status(404).json({
                message: e.message
            })
        }
    }
    async getByIdAlbum(req, res) {
        try {
            // const {id} = req.params;
            // const album = await Album.findById(id);
            // return res.json({
            //     message: album
            // })
            const { id } = req.params;
            let albumWithSong = await Album.aggregate([
                {

                    $lookup: {
                        from: 'songs',
                        as: 'songs',
                        let: { idAlbum: "$_id" },
                        pipeline: [{ $match: { $expr: { $eq: ['$idAlbum', '$$idAlbum'] } } }]
                    }
                },
                {
                    $match: {
                        _id: ObjectId(id)
                    }
                },
            ]).exec();
            // let album = await albumWithSong.find()
            // .populate('idArtist', '_id name imageUri')
            return res.json({
                message: albumWithSong
            })
        }
        catch (e) {
            return res.status(404).json({
                message: e.message
            })
        }
    }
    async getTheFirstSong(req, res) {
        const {idAlbum} = req.params;
        let song = await Song.findOne({ "idAlbum":idAlbum }).sort({ _id: 1 }).populate('idArtist', '_id name imageUri')
        let previousSong = await Song.findOne({"idAlbum": idAlbum,_id: {$lt: song.id}}).sort({_id: -1}).populate('idArtist', '_id name imageUri')
        if (previousSong==null){
            previousSong = await Song.findOne({'idAlbum': idAlbum}).sort({_id: -1}).populate('idArtist', '_id name imageUri')
        }
        let nextSong = await Song.findOne({ "idAlbum": idAlbum, _id: { $gt: song.id } }).sort({ _id: 1 }).populate('idArtist', '_id name imageUri')
        if (nextSong == null) {
            nextSong = await Song.findOne({ 'idAlbum': idAlbum }).sort({ _id: 1 }).populate('idArtist', '_id name imageUri')
        }
        if (previousSong==null && nextSong==null){
            previousSong= await Song.findById(id).populate('idArtist', '_id name imageUri')
            nextSong = await Song.findById(id).populate('idArtist', '_id name imageUri')
        }
        return res.json({
            message: song
            , previousSong, nextSong
        })
    }
    async getByIdCategory(req, res) {
        try {
            const { idCategory } = req.params;
            const album = await Album.find({ "idCategory": { "$in": idCategory } }).select();
            return res.json({
                message: album
            })
        }
        catch (e) {
            return res.status(404).json({
                message: e.message
            })
        }
    }
    async createAlbum(req, res) {
        try {
            const album = new Album({
                name: req.body.name,
                imageUri: req.body.imageUri,
                description: req.body.description,
                numberOfLikes: req.body.numberOfLikes,
                artistsHeadline: req.body.artistsHeadline,
                idCategory: req.body.idCategory,
            });
            const savedAlbum = await album.save();
            return res.json({
                message: album
            })
        } catch (e) {
            return res.status(404).json({
                message: e.message
            })
        }
    }
    async deleteAlbum(req, res) {
        try {
            const { id } = req.params;
            const removedAlbum = await Album.remove({ _id: id });
            return res.json({
                message: 'Delete successful'
            })
        } catch (error) {
            return res.status(404).json({
                message: e.message
            })
        }
    }
    async updateAlbum(req, res) {
        try {
            const { id } = req.params;
            const updateAlbum = await Album.updateOne({ _id: id })
            return res.json({
                message: updateAlbum
            })
        } catch (e) {
            return res.status(404).json({
                message: e.message
            })
        }
    }
}
module.exports = new AlbumController();