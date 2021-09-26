const User = require('../models/UserModel');
const ObjectId = require('mongoose').Types.ObjectId;
class UserRepository {
    async findByEmail(email) {
        return await User.findOne({email }).select({ 'email': 1, 'username': 1, 'password': 1 });
    }
    async findById(_id) {
        return await User.findOne({_id}).select({ 'email': 1, 'username': 1, 'password': 1 });
    }
}
module.exports = new UserRepository();