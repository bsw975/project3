const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const FriendRequestedBySchema = new Schema({ FriendRequestedBy: String });
// const FriendsSchema = new Schema({ Friends: String });

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    FriendRequestedBy: [
        { type: Schema.Types.ObjectId, ref: "Users" }
    ],
    Friends: [],
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('users', UserSchema);

module.exports = User;