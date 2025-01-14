const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    visibility:{
        type: String,
        default: 'public',
        enum: ['public','private'],
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now,
    // }

},{
    timestamps: true,
})

module.exports = mongoose.model('Post',postSchema);