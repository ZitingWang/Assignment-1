# Assignment 1 - API testing and Source Control.

Name: ZitingWang

## Overview.

My project is a small forum online and currently has three models: information, user, message.

## API endpoints.
 
//routes/informations.js

app.get('/informations', informations.findAll);  //get all the data of people

app.get('/informations/:id', informations.findOne);  //get one by _id

app.get('/informations/f/:key', informations.fuzzy);  //fuzzy search

app.get('/informations/t/table', informations.findfromtables);  //connection with other two tables

app.get('/informations/a/aom', informations.findTotalaom);  //get the total number of the messages

app.post('/informations',informations.addInformation);  //Insert data

app.put('/informations/:username', informations.incrementaom);  //Let the amountofmessage attribute in the informations add 1 from the original value

app.delete('/informations/:username', informations.deleteInformation);  //delete one by username

app.delete('/informations', informations.deleteAll);  //delete all the data in informations

//routes/user.js

app.get('/user', user.findAll); //get all the users

app.get('/user/:id', user.findOne); //get one by _id

app.get('/user/f/:key', user.fuzzy);  //fuzzy search

app.post('/user',user.addUser);  //Insert data

app.delete('/user/:id', user.deleteUser);  //delete one by username

app.delete('/user', user.deleteAll);  //delete all

//routes/message.js

app.get('/message', message.findAll);  //get all the messages

app.get('/message/:id', message.findOne); //get one by _id

app.get('/message/f/:key', message.fuzzy);  //fuzzy search

app.get('/message/s/find', message.findaoms);  //find the amount of information for each person

app.post('/message',message.addMessage);  //Insert data

app.delete('/message/:sender', message.deleteMessage);  //delete one by sender

app.delete('/message', message.deleteAll);  //delete all 

## Data storage.
. . . . This section is only relevant if your tests included the integration of MongoDB (or other database) with the API. It should specify the database schema, i.e. JSON document structure for each collection type in the MongoDB database.

## Sample Test execution.
information-test:
$npm test
> mine@0.0.0 test G:\homework\mine
> mocha test/routes/informations-test.js

  Informations
    GET /informations
Connected to Database: mongodb://localhost/node-test
GET /informations 200 15.299 ms - 165
      √ should return all the informations in an array (38ms)
GET /informations/5be1690731a5c256ad574fb4 200 3.103 ms - 165
      √ should return one of the informations in an array
GET /informations/f/b 200 2.456 ms - 165
      √ should return one of the informations in an array by fuzzy search
GET /informations/t/table 200 3.535 ms - 593
      √ should return the informations in different tables
GET /informations/t/table 200 1.802 ms - 593
      √ should return the total amount of messages
    POST /informations
POST /informations 200 18.480 ms - 145
      √ should return confirmation message and update datastore
GET /informations/f/te 200 1.735 ms - 167
    PUT /informations/:username
PUT /informations/bj 200 6.737 ms - 147
      √ should return a message and the information amountofmessage by 1
    DELETE /informations/:username
      DELETE /informations/:username
(node:104232) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
DELETE /informations/test 200 4.035 ms - 47
        √ should return Information Successfully Deleted!
GET /informations/f/te 200 1.477 ms - 2
      DELETE /informations/:username
DELETE /informations/ly 200 1.088 ms - 47
        √ should return Information Deleted err!
    DELETE /informations
(node:104232) DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
DELETE /informations 200 4.279 ms - 54
      √ should return All of the Informations Successfully Deleted!
    
message-test:
$npm test
> mine@0.0.0 test G:\homework\mine
> mocha test/routes/message-test.js

  Message
    GET /message
Connected to Database: mongodb://localhost/node-test
GET /message 200 16.020 ms - 127
      √ should return all the messages in an array (39ms)
GET /message/5be1690731a5c256ad574fd1 200 3.156 ms - 127
      √ should return one of the messages in an array
GET /message/f/b 200 2.320 ms - 127
      √ should return one of the messages in an array by fuzzy search
    POST /message
POST /message 200 18.551 ms - 128
      √ should return confirmation message and update datastore
GET /message/f/bj 200 1.668 ms - 127
    DELETE /message/:sender
      DELETE /message/:sender
(node:112956) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
DELETE /message/test 200 4.744 ms - 43
        √ should return Information Successfully Deleted!
GET /message/f/123 200 1.406 ms - 2
      DELETE /message/:sender
DELETE /message/ly 200 1.088 ms - 43
        √ should return message Deleted err!
    DELETE /message
(node:112956) DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
DELETE /message 200 3.926 ms - 55
      √ should return All of the messages Successfully Deleted!


  7 passing (3s)
user-test:
$npm test
> mine@0.0.0 test G:\homework\mine
> mocha test/routes/user-test.js
  User
    GET /informations
Connected to Database: mongodb://localhost/node-test
GET /user 200 15.622 ms - 121
      √ should return all the users in an array (39ms)
GET /user/5be1690731a5c256ad574fc1 200 3.180 ms - 121
      √ should return one of the users in an array
GET /user/f/b 200 2.208 ms - 121
      √ should return one of the users in an array by fuzzy search
    POST /user
POST /user 200 18.088 ms - 117
      √ should return confirmation message and update datastore
GET /user/f/te 200 1.852 ms - 122
    DELETE /user/:username
      DELETE /user/:username
(node:113644) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
DELETE /user/test 200 4.163 ms - 40
        √ should return User Successfully Deleted!
GET /user/f/te 200 1.390 ms - 2
      DELETE /user/:username
DELETE /user/ly 200 1.140 ms - 40
        √ should return User Deleted err!
    DELETE /user
(node:113644) DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
DELETE /user 200 3.863 ms - 52
      √ should return All of the Users Successfully Deleted!


  7 passing (3s)

[ Markdown Tip: By indenting the above listing, GitHub will display it in a 'box' and preserve any formatting.]

## Extra features.
I used the beforeEach,nested and supertest
