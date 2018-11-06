process.env.NODE_ENV = 'test';
var mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
chai.use(require('chai-things'));
chai.use(chaiHttp);
let _ = require('lodash' );
let message = require('../../models/message');
let user = require('../../models/users');
let information = require('../../models/informations');
const request = require('supertest');

describe('Informations', function (){
    beforeEach(function(done){
        var inf = new information({ _id:mongoose.Types.ObjectId('5be1690731a5c256ad574fb4'),
            id : 1,
            username : "bj",
            sex : "male",
            amountofmessage: 1
    });
        inf.save(function(err) {
            done();
        });
    });
    beforeEach(function(done){
        var us = new user({ _id:mongoose.Types.ObjectId('5be1690731a5c256ad574fc1'),
            username : "bj",
            password : "123456"
        });
        us.save(function(err) {
            done();
        });
    });
    beforeEach(function(done){
        var mes = new message({ _id:mongoose.Types.ObjectId('5be1690731a5c256ad574fd1'),
            sender : "bj",
            content : "This bj's test!"
        });
        mes.save(function(err) {
            done();
        });
    });
    //afterEach(function(done){
       // information.collection.drop();
       // done();
    //});

    describe('GET /informations',  () => {
        it('should return all the informations in an array', function(done) {
            request(server)
                .get('/informations')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (inf) => {
                        return { id: inf.id,
                            username: inf.username,
                            sex: inf.sex}
                    });
                    expect(result).to.include( { id: 1, username:"bj",sex: "male"  } );
                    information.collection.drop();
                    done();
                });
        });
        it('should return one of the informations in an array', function(done) {
                request(server)
                    .get('/informations/5be1690731a5c256ad574fb4')
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        expect(res.body.length).to.equal(1);
                        let result = _.map(res.body, (inf) => {
                            return { id: inf.id,
                                username: inf.username,
                                sex: inf.sex}
                        });
                        expect(result).to.include( { id: 1, username:"bj",sex: "male"  } );
                        information.collection.drop();
                        done();
                    });

        });
        it('should return one of the informations in an array by fuzzy search', function(done) {
            request(server)
                .get('/informations/f/b')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (inf) => {
                        return { id: inf.id,
                            username: inf.username,
                            sex: inf.sex}
                    });
                    expect(result).to.include( { id: 1, username:"bj",sex: "male"  } );
                    information.collection.drop();
                    done();
                });
        });
        it('should return the informations in different tables', function(done) {
            request(server)
                .get('/informations/t/table')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (inf) => {
                        return { id: inf.id,
                            username: inf.username,
                            sex: inf.sex}
                    });
                    expect(result).to.include( { id: 1, username:"bj",sex: "male"});
                    information.collection.drop();
                    user.collection.drop();
                    message.collection.drop();
                    done();
                });
        });
        it('should return the total amount of messages', function(done) {
            request(server)
                .get('/informations/t/table')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    information.collection.drop();
                    done();
                });
        });
    });
    describe('POST /informations', function () {
        it('should return confirmation message and update datastore', function(done) {
            let information = {
                id : 2,
                username: 'test' ,
                sex: 'male',
                amountofmessage: 0
            };
            request(server)
                .post('/informations')
                .send(information)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Information Successfully Added!' );
                    done();
                });
        });
        after(function  (done) {
            request(server)
                .get('/informations/f/te')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (inf) => {
                        return { id: inf.id,
                            username: inf.username,
                            sex: inf.sex}
                    });
                    expect(result).to.include( { id: 2, username:"test",sex: "male"  } );
                    done();
                });
        });
    });
});
