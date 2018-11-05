var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const informations = require("./routes/informations");
const user = require("./routes/user");
const message = require("./routes/message");
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler

//routes/informations.js
app.get('/informations', informations.findAll);
app.get('/informations/:id', informations.findOne);
app.get('/informations/f/:key', informations.fuzzy);
app.get('/informations/t/table', informations.findfromtables);
app.get('/informations/a/aom', informations.findTotalaom);
app.post('/informations',informations.addInformation);
app.put('/informations/:username', informations.incrementaom);
app.delete('/informations/:username', informations.deleteInformation);
app.delete('/informations', informations.deleteAll);

//routes/user.js
app.get('/user', user.findAll);
app.get('/user/:id', user.findOne);
app.get('/user/f/:key', user.fuzzy);
app.post('/user',user.addUser);
app.delete('/user/:id', user.deleteUser);
app.delete('/user', user.deleteAll);

//routes/message.js
app.get('/message', message.findAll);
app.get('/message/:id', message.findOne);
app.get('/message/f/:key', message.fuzzy);
app.post('/message',message.addMessage);
app.delete('/message/:sender', message.deleteMessage);
app.delete('/message', message.deleteAll);
app.get('/message/s/find', message.findaoms);
//routes finish

app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');

});

module.exports = app;
