/**
 * @Author: Ido
 * @Date: Sep 2018
 *
 */
var express = require('express');

try {
	require('../../.shhh');
	console.log("(!) We are on " + process.env.ENVIRONMENT + " Env.");
} catch (e) {
	throw 'Environment variables not found! Well, check why...';
}

var app = express();
var router = require('./router')(app);

var server = app.listen(process.env.PORT, function () {
	console.log('Listening... on ' + process.env.PORT);
});