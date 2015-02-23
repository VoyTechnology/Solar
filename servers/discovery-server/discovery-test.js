var test = require('unit.js');
var request = require('http');

var addr = require('./test-config.json').address;

var oldlog = console.log;


describe("Discovery Server", function(){

	it('responded with a status of 200 OK', function(){
		request.get(addr, function(res){
			test.assert(res.statusCode == 200);
		});
	});

	it('responded with JSON content type', function(){
		request.get(addr, function(res){
			test.assert(res.headers['content-type'] == 'application/json');
		});
	});

	it('responded with valid json', function(){
		request.get(addr, function(res){
			var body = '';
			res.on('data', function(data){
				body += data.toString();
			});
			res.on('end', function(){
				test.assert(typeof JSON.parse(body) == 'object');
			});
		});
	});

	it('responded with success set to true', function(){
		request.get(addr, function(res){
			var body = '';
			res.on('data', function(data){
				body += data.toString();
			});
			res.on('end', function(){
				test.assert(JSON.parse(body).success);
			});
		});
	});

	it('has 3 servers', function(){
		request.get(addr, function(res){
			var body = '';
			res.on('data', function(data){
				body += data.toString();
			});
			res.on('end', function(){
				var addresses = JSON.parse(body).addresses;
				test.assert(Object.keys(addresses).length == 3);
			});
		});
	});

	it('servers are valid', function(){
		request.get(addr, function(res){
			var body = '';
			res.on('data', function(data){
				body += data.toString();
			});
			res.on('end', function(){
				var addresses = JSON.parse(body).addresses;
				test.array(Object.keys(addresses)).is(['authServer', 'gameServer', 'tradeServer']);
			});
		});
	});

});
