
var gulp = require('gulp');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var jade = require('gulp-jade');
var rename = require('gulp-rename');


//compile less
gulp.task('less', function(){
	gulp.src(['**/*.less', '!node_modules/**/*.*', '!mod/**/*.*'])
		.pipe(less())
		.pipe(minifyCss())
		.pipe(gulp.dest('../www'));
});

//compress and rename *.js
gulp.task('uglify', function(){
	gulp.src(['js/*.js', '!js/*.min.js'], {base: './'})
		//.pipe(uglify())
		.pipe(rename(function(path){
			path.basename += '.min';
		}))
		.pipe(gulp.dest('../www/', {overwrite: true}));
})

//copy fonts file
gulp.task('copy', function(){
	gulp.src('css/fonts/*.*')
			.pipe(gulp.dest('../www/css/fonts/', {overwrite: true}))
})

//compile jade
gulp.task('jade', function(){
	gulp.src(['**/*.src.jade'])
			.pipe(jade({pretty: false}))
			.pipe(rename(function(path){
				path.basename = path.basename.replace(/\.src$/, '');
				path.extname = '.html'
			}))
			.pipe(gulp.dest('../www'))
})


gulp.task('default', function(){
	// console.log(process.env.TARGET)
	gulp.run('less', 'uglify', 'jade', 'copy');
});
