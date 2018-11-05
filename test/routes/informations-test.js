let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
chai.use(require('chai-things'));
chai.use(chaiHttp);
let _ = require('lodash' );
let datastore = require('../../models/informations');
describe('Informations', function (){
    describe('GET /informations',  () => {
        it('should return all the informations in an array', function(done) {
            chai.request(server)
                .get('/informations')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(2);
                    done();
                });
        });
    });
    describe('POST /informations', function () {
        it('should return confirmation message and update datastore', function(done) {
            let information = {
                id : 1000,
                username: 'test' ,
                sex: 'male',
                amountofmessage: 0
            };
            chai.request(server)
                .post('/informations')
                .send(information)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Information Successfully Added!' );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get('/informations')
                .end(function(err, res) {
                    let result = _.map(res.body, (information) => {
                        return { username: information.username,
                            sex: information.sex };
                    });
                    expect(result).to.include( { username: 'test', sex: 'male'  } );
                    done();
                });
        });
    });
    describe('PUT /informations/:username', () => {
        it('should return a message and the information amountofmessage by 1', function(done) {
            chai.request(server)
                .put('/informations/ly')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    let information = res.body.message ;
                    expect(information).to.include('Information Successfully Increased!');
                    done();
                });
        });
    });
    describe('DELETE /informations/:id', function () {
        it('should return Information Successfully Deleted!', function(done) {
            chai.request(server)
                .delete('/informations/1000')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    let information = res.body.message;
                    expect(information).to.include('Information Successfully Deleted!');
                    done();
                });
        });
    });
    describe('DELETE /informations', function () {
        it('should return Information Successfully Deleted!', function(done) {
            chai.request(server)
                .delete('/informations')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    let information = res.body.message;
                    expect(information).to.include('All of Information Successfully Deleted!');
                    done();
                });
        });
    });
});
