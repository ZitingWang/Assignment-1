let mongoose = require('mongoose');
var lengthValidator = function(val) {
        if (val.length > 1){
                return true;
        }
        return false;
};
let InformationSchema = new mongoose.Schema({
        id: {type:Number},
        username :{type:String,required: true, validate: {validator:lengthValidator,msg:'Too short'}},
        sex: {type:String},
        amountofmessage : {type: Number, default: 0}
    },{versionKey:false},
    { collection: 'informationdb' });

module.exports = mongoose.model('Information', InformationSchema);