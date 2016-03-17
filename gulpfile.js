
var gulp = require('gulp');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var jade = require('gulp-jade');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var data = require('gulp-data');
var cssBase64 = require('gulp-css-base64');
var babel = require("gulp-babel");
var del = require('del');
var gulpif = require('gulp-if');
var fileinclude = require('gulp-file-include');


gulp.task('clean', function(cb) {
  del(['../www/**/*.html', '../www/**/*.css', '../www/**/*.js'], {force: true}).then(function() {
    cb();
  })
})


//compile less
gulp.task('less', function(){
  gulp.src(['css/**/*.less', '!**/*.mod.less', '!node_modules/**/*.*', '!bak/**/*.*'], {base: './'})
    .pipe(less())
    .pipe(cssBase64({
      // baseDir: '../mod/css',
      maxWeightResource: 100000,
      extensionsAllowed: []
    }))
    .pipe(autoprefixer())
    .pipe(gulpif(process.env.TARGET === 'production', minifyCss()))
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
    .pipe(gulp.dest('../www/'));
})
*/

gulp.task('pack', function() {
  gulp.src('./index.entry.js')
      .pipe(browserify({
        debug: process.env.TARGET !== 'production'
      }))
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(gulpif(process.env.TARGET === 'production', uglify()))
      .pipe(rename(function(path) {
        path.basename = path.basename.replace(/\.entry/, '.app');
      }))
      .pipe(gulp.dest('../www'));

})

//copy images and CNAME, there's no need to copy fonts because of css-base64
gulp.task('copy', function(){
  // gulp.src('css/fonts/*.*')
  //    .pipe(gulp.dest('../www/css/fonts/'));

  //copy images
  gulp.src(['img/**/*.*'], {base: './'})
      .pipe(gulp.dest('../www/', {overwrite: true}));

  gulp.src('CNAME')
      .pipe(gulp.dest('../www/'));
})

//compile jade
gulp.task('jade', function(){
  gulp.src(['**/*.src.jade', '!bak/**/*.*'])
      .pipe(data(function() {
        return require('./data/data');
      }))
      .pipe(jade({pretty: false}))
      .pipe(rename(function(path){
        path.basename = path.basename.replace(/\.src$/, '');
        path.extname = '.html'
      }))
      .pipe(fileinclude())  //引入skill_chart中的svg
      .pipe(gulp.dest('../www'))
});


gulp.task('default', ['clean'], function(){
  gulp.run('less', 'pack', 'jade', 'copy');
});
