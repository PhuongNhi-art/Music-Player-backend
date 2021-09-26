const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        max: 255,
    },
    username: {
        type: String,
        required: true,
        max: 255,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Number,
        default: Date.now
    },
    updatedAt: {
        type: Number,
        default: Date.now
    },
});

UserSchema.pre('save', async function(next) {
    
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});

module.exports = mongoose.model('User', UserSchema);