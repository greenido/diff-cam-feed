/**
 * @Author: Ido
 * @Date: Sep 2018
 * @see
 */

var bodyParser = require('body-parser');
var express = require('express');
var expressHandlebars = require('express-handlebars');
var expressSession = require('express-session');

module.exports = function (app) {
	app.engine('.hbs', expressHandlebars({
		extname: '.hbs'
	}));
	app.set('view engine', '.hbs');
	app.set('views', './dist/server/views');

	app.use(expressSession({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true
	}));
	app.use(bodyParser.json({
		limit: '4mb'
	}));
	app.use(bodyParser.urlencoded({
		extended: false,
		limit: '4mb'
	}));

	app.use('/', require('./routes/home'));
	app.use('/upload', require('./routes/upload'));
	app.use('/status', require('./routes/status'));
	app.use(express.static('./dist/client'));
};