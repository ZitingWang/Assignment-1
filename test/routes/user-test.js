process.env.NODE_ENV = 'test';
var mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
chai.use(require('chai-things'));
chai.use(chaiHttp);
let _ = require('lodash' );
let user = require('../../models/users');
const request = require('supertest');

describe('User', function (){
    beforeEach(function(done){
        var us = new user({ _id:mongoose.Types.ObjectId('5be1690731a5c256ad574fc1'),
            username : "bj",
            password : "123456"
        });
        us.save(function(err) {
            done();
        });
    });
    //afterEach(function(done){
    // information.collection.drop();
    // done();
    //});

    describe('GET /informations',  () => {
        it('should return all the users in an array', function(done) {
            request(server)
                .get('/user')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (inf) => {
                        return {username: inf.username,
                            password: inf.password}
                    });
                    expect(result).to.include( {username:"bj",password: "123456"  } );
                    user.collection.drop();
                    done();
                });
        });
        it('should return one of the users in an array', function(done) {
            request(server)
                .get('/user/5be1690731a5c256ad574fc1')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (inf) => {
                        return {username: inf.username,
                            password: inf.password}
                    });
                    expect(result).to.include( {username:"bj",password: "123456"  } );
                    user.collection.drop();
                    done();
                });

        });
        it('should return one of the users in an array by fuzzy search', function(done) {
            request(server)
                .get('/user/f/b')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (inf) => {
                        return {username: inf.username,
                            password: inf.password}
                    });
                    expect(result).to.include( {username:"bj",password: "123456"  } );
                    user.collection.drop();
                    done();
                });
        });
    });
    describe('POST /user', function () {
        it('should return confirmation message and update datastore', function(done) {
            let information = {
                username: 'test' ,
                password: 'mmxzs'
            };
            request(server)
                .post('/user')
                .send(information)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('User Successfully Added!' );
                    done();
                });
        });
        after(function  (done) {
            request(server)
                .get('/user/f/te')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (inf) => {
                        return {username: inf.username,
                            password: inf.password}
                    });
                    expect(result).to.include( {username:"test",password: "mmxzs"  } );
                    done();
                });
        });
    });
    describe('DELETE /user/:username', function () {
        describe('DELETE /user/:username', function () {
            it('should return User Successfully Deleted!', function(done) {
                request(server)
                    .delete('/user/test')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        let information = res.body.message;
                        expect(information).to.include('User Successfully Deleted!');
                        done();
                    });
            });
            after(function  (done) {
                request(server)
                    .get('/user/f/te')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.empty
                        done();
                    });
            });
        });
        describe('DELETE /user/:username', function () {
            it('should return User Deleted err!', function(done) {
                request(server)
                    .delete('/user/ly')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
        });
    });
    describe('DELETE /user', function () {
        it('should return All of the Users Successfully Deleted!', function(done) {
            request(server)
                .delete('/user')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    let information = res.body.message;
                    expect(information).to.include('All of the Users Successfully Deleted!');
                    done();
                });
        });

    });
});
