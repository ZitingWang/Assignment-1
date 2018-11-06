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
const request = require('supertest');
describe('Message', function (){
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

    describe('GET /message',  () => {
        it('should return all the messages in an array', function(done) {
            request(server)
                .get('/message')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (inf) => {
                        return { sender: inf.sender,
                            content: inf.content}
                    });
                    expect(result).to.include( { sender : "bj", content : "This bj's test!"  } );
                    message.collection.drop();
                    done();
                });
        });
        it('should return one of the messages in an array', function(done) {
            request(server)
                .get('/message/5be1690731a5c256ad574fd1')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (inf) => {
                        return { sender: inf.sender,
                            content: inf.content}
                    });
                    expect(result).to.include( { sender : "bj", content : "This bj's test!"  } );
                    message.collection.drop();
                    done();
                });

        });
        it('should return one of the messages in an array by fuzzy search', function(done) {
            request(server)
                .get('/message/f/b')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (inf) => {
                        return { sender: inf.sender,
                            content: inf.content}
                    });
                    expect(result).to.include( { sender : "bj", content : "This bj's test!"  } );
                    message.collection.drop();
                    done();
                });
        });
    });
    describe('POST /message', function () {
        it('should return confirmation message and update datastore', function(done) {
            let information = {
                sender: 'test' ,
                content: '123'
            };
            request(server)
                .post('/message')
                .send(information)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Message sent by test Successfully Added!' );
                    done();
                });
        });
        after(function  (done) {
            request(server)
                .get('/message/f/bj')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (inf) => {
                        return { sender: inf.sender,
                            content: inf.content}
                    });
                    expect(result).to.include( { sender : "bj", content : "This bj's test!"  } );
                    done();
                });
        });
    });

    describe('DELETE /message/:sender', function () {
        describe('DELETE /message/:sender', function () {
            it('should return Information Successfully Deleted!', function(done) {
                request(server)
                    .delete('/message/test')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        let information = res.body.message;
                        expect(information).to.include('Message Successfully Deleted!');
                        done();
                    });
            });
            after(function  (done) {
                request(server)
                    .get('/message/f/123')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.empty
                        done();
                    });
            });
        });
        describe('DELETE /message/:sender', function () {
            it('should return message Deleted err!', function(done) {
                request(server)
                    .delete('/message/ly')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
        });
    });
    describe('DELETE /message', function () {
        it('should return All of the messages Successfully Deleted!', function(done) {
            request(server)
                .delete('/message')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    let inf = res.body.message;
                    expect(inf).to.include('All of the messages Successfully Deleted!');
                    done();
                });
        });

    });
});
