const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AddFriendSchema = new Schema({
    requestor: {
        type: String,
        required: true
    },
    requestee: {
        type: String,
        required: true
    },
    deferred: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const AddFriend = mongoose.model('users', AddFriendSchema);

module.exports = AddFriend;