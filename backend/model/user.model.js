const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 50,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    pic: {
        type: String,
        required: true,
        default: 'https://imgs.search.brave.com/oG4DGxHseDkqVrnfHSOGrdYT9JsfN7IRDwgDeqJghmo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90ZXN0/LWhjYy51bml0ZWRs/YXllci5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjAvMDEv/ZHVtbXktcHJvZmls/ZS5qcGc'
    }
});

module.exports = mongoose.model('chatuser', userSchema);