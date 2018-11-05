let mongoose = require('mongoose');

let MessageSchema = new mongoose.Schema({
        sender :{type:String},
        content : {type:String},
    },{versionKey:false},
    { collection: 'messagedb' });

module.exports = mongoose.model('Message', MessageSchema);