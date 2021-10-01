const mongoose = require('mongoose');

const AlbumCategorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 255,
    },
    description: {
        type: String,
        max: 255,
        default: ''
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

module.exports = mongoose.model('Category', AlbumCategorySchema);