var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	jshint = require('gulp-jshint'),
	jshintStylish = require('jshint-stylish');

// file paths
var cssSources = ['./styles/**/*.scss'],
	jsFrontSources = ['./scripts/**/*.js'],
	jsBackSources = ['app.js', 'gulpfile.js', 'package.json'];

// prefer jshint config here rather than hidden file
var jshintConfig = {
	'lookup': false,
	'globals': {
		'define': false
	}
};

// css stuff
gulp.task('css', function() {
	gulp.src(cssSources)
		.pipe(sass({ errLogToConsole: true }))
		.pipe(autoprefixer())
		.pipe(gulp.dest('./public/css'));
});

// front-end javascript
gulp.task('js-front', function() {
	gulp.src(jsFrontSources)
		.pipe(jshint(jshintConfig))
		.pipe(jshint.reporter(jshintStylish))
		.pipe(gulp.dest('./public/js'));
});

// back-end javascript
gulp.task('js-back', function() {
	gulp.src(jsBackSources)
		.pipe(jshint(jshintConfig))
		.pipe(jshint.reporter(jshintStylish));
});

// build site
gulp.task('build', ['css', 'js-front', 'js-back']);

// build site and watch for changes
gulp.task('watch', ['build'], function() {
	gulp.watch(cssSources, ['css']);
	gulp.watch(jsFrontSources, ['js-front']);
	gulp.watch(jsBackSources, ['js-back']);
});