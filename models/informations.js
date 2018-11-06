let mongoose = require('mongoose');

let InformationSchema = new mongoose.Schema({
        id: {type:Number},
        username :{type:String},
        sex: {type:String},
        amountofmessage : {type: Number, default: 0}
    },{versionKey:false},
    { collection: 'informationdb' });

module.exports = mongoose.model('Information', InformationSchema);