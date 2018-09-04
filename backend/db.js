// db.js

module.exports = {
    // DB: 'mongodb://localhost:27017/auth'
    DB: process.env.MONGODB_URI || "mongodb://localhost/auth"

}
