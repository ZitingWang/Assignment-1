let mongoose = require('mongoose');
var lengthValidator = function(val) {
    if (val.length > 6){
        return true;
    }
    return false;
};
let UserSchema = new mongoose.Schema({

        username: {type:String},
        password: {type:String,required: true, validate: {validator:lengthValidator,msg:'Too short'}}

    },{versionKey:false},
    { collection: 'userdb' });

module.exports = mongoose.model('User', UserSchema);