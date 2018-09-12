/**
 * @Author: Ido
 * @Date: Sep 2018
 *
 */
var express = require('express');

console.log("(!) We are on " + process.env.ENVIRONMENT + " Env.");
try {
	require('../../.shhh');
} catch (e) {
	throw 'Environment variables not found! Well, check why...';
}

var app = express();
var router = require('./router')(app);

var server = app.listen(process.env.PORT, function () {
	console.log('Listening... on ' + process.env.PORT);
});