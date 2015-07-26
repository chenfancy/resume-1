
var gulp = require('gulp');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');

var rtt = require('rtt');

//compile less
gulp.task('less', function(){
	gulp.src('mobile/css/*.less')
		.pipe(less())
		.pipe(minifyCss())
		.pipe(gulp.dest('../www/mobile/css/'));
	gulp.src('css/*.less')
		.pipe(less())
		.pipe(minifyCss())
		.pipe(gulp.dest('../www/css/'));
});

//compress js
gulp.task('uglify', function(){
	gulp.src('js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('../www/js'));
	gulp.src('mobile/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('../www/mobile/js'));
})

//copy fonts file
gulp.task('copy', function(){
	gulp.src('css/fonts/*.*')
		.pipe(gulp.dest('../www/css/fonts/'))
})

//replace templete
gulp.task('rtt', function(){
	rtt('index.src.html', '../www/index.html', 'data/data.json');
	rtt('mobile/index.src.html', '../www/mobile/index.html', 'data/data.json');
})


gulp.task('default', function(){
	gulp.run('less', 'uglify', 'rtt', 'copy');
});
