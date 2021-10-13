const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
const ArtistSchema = mongoose.Schema({
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
    
});

// AlbumSchema.pre('save', async function(next) {
    
//     const salt = await bcrypt.genSalt(10)
//     const hash = await bcrypt.hash(this.password, salt);
//     this.password = hash;
//     next();
// });

module.exports = mongoose.model('Artist', ArtistSchema);