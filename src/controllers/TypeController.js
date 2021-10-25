require('dotenv').config();
const Type = require('../models/TypeModel');
const Song = require('../models/SongModel');
const ObjectId = require('mongoose').Types.ObjectId
class TypeController {
    async getAll(req, res) {
        try {
            const types = await Type.find();
            return res.json({
                message: types
            })
        }
        catch (e) {
            return res.status(404).json({
                message: e.message
            })
        }
    }
    async getByIdType(req, res) {
        try {
            const { id } = req.params;
            let type = await Type.aggregate([
                {

                    $lookup: {
                        from: 'songs',
                        as: 'songs',
                        let: { idType: "$_id" },
                        pipeline: [{ $match: { $expr: { $eq: ['$idType', '$$idType'] } } }]
                    }
                },
                {
                    $match: {
                        _id: ObjectId(id)
                    }
                },
            ]).exec();
            // let typeWithArtist = await type.find()
            // .populate('idArtist', '_id name imageUri')
            return res.json({
                message: type
            })
        }
        catch (e) {
            return res.status(404).json({
                message: e.message
            })
        }
    }
    async createType(req, res){
        try {
            const type = new Type({
                name: req.body.name,
                imageUri: req.body.imageUri,
            });
            const savedType = await type.save();
            return res.json({
                message: savedType
            })
        } catch (e) {
            return res.status(404).json({
                message: e.message
            })
        }
    }
    
}
module.exports = new TypeController();