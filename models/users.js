let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({

        username: {type:String},
        password: {type:String}

    },{versionKey:false},
    { collection: 'userdb' });

module.exports = mongoose.model('User', UserSchema);