const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
const SongSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
    },
    imageUri: {
        type: String,
        required: true,
        max: 255,
    },
    description: {
        type: String,
        max: 255,
        defaut: null,
    },
    uri: {
        type: String,
        max: 255,
        required: true,
    },
    numberOfLikes: {
        type: Number,
        default: 0,
    },
    artists: {
        type: ObjectId,
        max: 255,
        default: null,
    },
    idType: {
        type: ObjectId,
        max: 255,
        default: null,
        // ref : 'Type',
    },
    idAlbum: {
        type: ObjectId,
        max: 255,
        default: null,
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

// AlbumSchema.pre('save', async function(next) {
    
//     const salt = await bcrypt.genSalt(10)
//     const hash = await bcrypt.hash(this.password, salt);
//     this.password = hash;
//     next();
// });

module.exports = mongoose.model('Song', SongSchema);