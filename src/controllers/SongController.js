require('dotenv').config();
const Song = require('../models/SongModel');
const Album = require('../models/AlbumModel');
const Artist = require('../models/ArtistModel');
const ObjectId = require('mongoose').Types.ObjectId
class SongController {
    
    async getAll(req, res) {
        try {
            let songs = await Song.find()
            .populate('idArtist', '_id name imageUri')
            // .populate("lastMessage").populate({
            //     path: 'last_msg_id',
            //     populate: {path: 'from'}
            // }).populate("admin", '_id username email');
            
            // const songs = await Song.find();
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
    async search(req, res) {
        try {
            const {key} = req.params;
            const songs = await Song.find({ name: { $regex: key ,$options:'i'} }).populate('idArtist', '_id name imageUri');
            const albums = await Album.find({ name: { $regex: key,$options:'i' } });
            
            const artists = await Artist.find({ name: { $regex: key,$options:'i' } });
            return res.json({
                message: {songs:songs, albums: albums, artists: artists}
            })
        } catch (e) {
            return res.status(404).json({
                message: e.message
            })
        }
    }
    async getByIdSong(req, res) {
        try {
            const {id} = req.params;
            // const song = await Song.findById(id);
            let song = await Song.findById(id)
            .populate('idArtist', '_id name imageUri')
            let previousSong = await Song.findOne({"idAlbum": song.idAlbum,_id: {$lt: id}}).sort({_id: -1})
            if (previousSong==null){
                previousSong = await Song.findOne({'idAlbum': song.idAlbum}).sort({_id: -1})
            }
            let nextSong = await Song.findOne({"idAlbum": song.idAlbum,_id: {$gt: id}}).sort({_id: 1})
            if (nextSong==null){
                nextSong = await Song.findOne({'idAlbum': song.idAlbum}).sort({_id: 1})
            }
            if (previousSong==null && nextSong==null){
                previousSong= await Song.findById(id).populate('idArtist', '_id name imageUri')
                nextSong = await Song.findById(id).populate('idArtist', '_id name imageUri')
            }
            return res.json({
                message: song, previousSong,nextSong
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
                idArtist: req.body.idArtist,
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