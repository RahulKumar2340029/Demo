const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    visibility: {
        type: String,
        default: 'private',
        enum: ['public', 'private'],
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
    },
    title: {
        type: String,
        required: true,
    },
    collaborators: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        email: {
            type: String,
            required: true, 
            
        },
    }],
    secret_visible_to:[{
        email:{
            type: String,
            required: true,
        }
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('Post', postSchema);
