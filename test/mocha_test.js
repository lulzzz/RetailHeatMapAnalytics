/**
 * New node file
 */
var request = require('request')
, express = require('express')
,assert = require("assert")
,http = require("http");

describe('http tests', function(){

	it('should return the homepage if the url is correct', function(done){
		http.get('http://localhost:3000/', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});

	it('should  return the past analytics page if the url is right', function(done){
		http.get('http://localhost:3000/past', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});
	it('should not return the past analytics page if the url is wrong', function(done){
		http.get('http://localhost:3000/past1', function(res) {
			assert.equal(404, res.statusCode);
			done();
		})
	});


});
