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

});
