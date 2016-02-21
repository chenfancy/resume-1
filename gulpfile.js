
var gulp = require('gulp');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var jade = require('gulp-jade');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');

var data = require('gulp-data');

var babel = require("gulp-babel");
// var del = require('gulp-del');

var gulpif = require('gulp-if');

var fileinclude = require('gulp-file-include');


// gulp.task('del', function(cb) {
// 	del([], function() {
// 		cb();
// 	})
// })


//compile less
gulp.task('less', function(){
	gulp.src(['**/*.less', '!node_modules/**/*.*', '!mod/**/*.*', '!bak/**/*.*'])
		.pipe(less())
		.pipe(autoprefixer())
		.pipe(minifyCss())
		.pipe(gulp.dest('../www'));
});

/*
//compress and rename *.js
gulp.task('uglify', function(){
	gulp.src(['js/*.js', '!js/*.min.js'], {base: './'})
		.pipe(gulpif(process.env.TARGET === 'production', uglify()))
		// .pipe(process.env.TARGET === 'production' ? uglify() :   )
		.pipe(rename(function(path){
			path.basename += '.min';
		}))
		.pipe(gulp.dest('../www/', {overwrite: true}));
})
*/

gulp.task('pack', function() {
	gulp.src('./entry.js')
			.pipe(browserify({
				debug: process.env.TARGET !== 'production'
			}))
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(gulpif(process.env.TARGET === 'production', uglify()))
			.pipe(rename(function(path) {
				path.basename = 'app.min';
			}))
			.pipe(gulp.dest('../www', {overwrite: true}));

})

//copy fonts and images and CNAME
gulp.task('copy', function(){
	gulp.src('css/fonts/*.*')
			.pipe(gulp.dest('../www/css/fonts/', {overwrite: true}));

	//copy images
	gulp.src(['img/**/*.*'], {base: './'})
			.pipe(gulp.dest('../www/', {overwrite: true}));

	gulp.src('CNAME')
			.pipe(gulp.dest('../www/', {overwrite: true}));
})

//compile jade
gulp.task('jade', function(){
	gulp.src(['**/index.src.jade', '!bak/**/*.*'])
			.pipe(data(function() {
				return require('./data/data');
			}))
			.pipe(jade({pretty: false}))
			.pipe(rename(function(path){
				path.basename = path.basename.replace(/\.src$/, '');
				path.extname = '.html'
			}))
			.pipe(fileinclude())	//引入skill_chart中的svg
			.pipe(gulp.dest('../www'))
});


gulp.task('default', function(){
	gulp.run('less', 'pack', 'jade', 'copy');
});
