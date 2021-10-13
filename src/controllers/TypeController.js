require('dotenv').config();
const Type = require('../models/TypeModel');
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
            const {idType} = req.params;
            const type = await Type.find({"idType": {"$in": idType}}).select();
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