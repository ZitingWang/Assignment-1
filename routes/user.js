let User = require('../models/users');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var mongodbUri = 'mongodb://WZT:NBNBwzt155@ds139193.mlab.com:39193/heroku_45x9jh4d'
mongoose.connect(mongodbUri);

let db = mongoose.connection;
db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ] on mlab.com');
});

router.findAll = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    User.find(function(err, user) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(user,null,5));
    });
}

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    User.find({ "_id" : req.params.id },function(err, user) {
        if (err)
            res.json({ message: 'Donation NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(user,null,5));
    });
}
router.fuzzy = (req, res) =>{
    var key = req.params.key;
    var whereStr = {$or:[
            {username:{$regex:key,$options: '$i'}},
        ]}

    User.find(whereStr, function (err, user) {
        if (err) {
            res.json({ message: 'Message NOT Found!', errmsg : err } );
        } else {
            res.send(JSON.stringify(user,null,5));
        }
    })
}


router.addUser = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.save(function(err) {
        if (err)
            res.json({ message: 'User NOT Added!', errmsg : err } );
        else
            res.json({ message: 'User Successfully Added!', data: user });
    });
}
router.deleteUser = (req, res) => {

    User.findOneAndRemove({"username":req.params.username}, function(err) {
        if (err)
            res.json({ message: 'User NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'User Successfully Deleted!'});
    });
}
router.deleteAll = (req, res) => {

    User.remove({}, function(err) {
        if (err)
            res.json({ message: 'Users NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'All of the users Successfully Deleted!'});
    });
}




module.exports = router;