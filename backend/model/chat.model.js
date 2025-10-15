const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    charName: {
        type: String,
        trim: true
    },

    isGroupChat: {
        type: Boolean,
        required: true,
        default: false
    },

    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "chatuser"
    }],

    latestMessages: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'message'
    },

    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chatuser"
    }
}, { timestamps: true });


module.exports = mongoose.model('Chat', chatSchema);