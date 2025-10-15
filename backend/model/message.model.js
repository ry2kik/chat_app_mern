const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chatuser"
    },

    content: {
        type: String,
        trim: true
    },

    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chatuser"
    }
}, { timestamps: true });

module.exports = mongoose.model('message', messageSchema);