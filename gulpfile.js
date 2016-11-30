
var gulp = require('gulp');
var fs = require('fs');
var minhtml = require('gulp-htmlmin');
var mincss = require('gulp-uglifycss');
var minjs = require('gulp-uglifyjs');

// cleanup the public folder
/**
 * @param {string} path folder path to remove
 */
 function deleteFolder(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file, index) {
      var curPath = path + '/' + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolder(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};
deleteFolder('frontend/public');

gulp.task('default', ['libs', 'compress'], function() {
  // compress html css js files in folder src
  gulp.watch('frontend/src/**', ['compress']);
});


/*
 * Dependencies management
 * move libs from node_modules to frontend/public/
 */
gulp.task('libs', function() {
  // move js libs to frontend/public/js/libs
  gulp.src([
      'node_modules/backbone/backbone-min.js',
      'node_modules/backbone/backbone-min.map',
      'node_modules/underscore/underscore-min.js',
      'node_modules/underscore/underscore-min.map',
      'node_modules/zepto/dist/zepto.min.js',
      'node_modules/bootstrap/dist/bootstrap.min.js',
    ])
    .pipe(gulp.dest('frontend/public/js/libs/'));

  // compress js before moving
  gulp.src([
    'node_modules/requirejs/require.js',
  ])
  .pipe(minjs())
  .pipe(gulp.dest('frontend/public/js/libs/'));

  // move css libs to frontend/public/css/
  gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/bootstrap/dist/css/bootstrap.min.css.map',
    'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
    'node_modules/bootstrap/dist/css/bootstrap-theme.min.css.map',
    ])
    .pipe(gulp.dest('frontend/public/css/'));

  // move fonts libs to frontend/public/fonts
  gulp.src([
    'node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
    'node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
    'node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
    'node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2',
    ])
    .pipe(gulp.dest('frontend/public/fonts/'));
});


/*
 * Compress public files include css html and js
 */
gulp.task('compress', function() {
  var srcpath = 'frontend/src/';
  var destpath = 'frontend/public/';

  // compress css files
  gulp.src(srcpath + 'css/*.css')
    .pipe(mincss({
      'maxLineLen': 80,
      'uglyComments': true}))
    .pipe(gulp.dest(destpath + 'css/'));

  // compress html files
  gulp.src(srcpath + '*.html')
    .pipe(minhtml({
      minifyCSS: true,
      minifyJS: true,
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
      quoteCharacter: '"',
      removeComments: true,
      sortAttributes: true}))
    .pipe(gulp.dest(destpath));

  // compress js files
  gulp.src(srcpath + 'js/**/*.js')
    .pipe(minjs())
    .pipe(gulp.dest(destpath + 'js/'));

  // move favicon.ico to public/
  gulp.src(srcpath + '*.ico')
    .pipe(gulp.dest(destpath));

  // move templetes to public/tpl/
  gulp.src(srcpath + 'tpl/*')
    .pipe(gulp.dest(destpath + 'tpl/'));

  // move images from src/img folder to public/img
  gulp.src(srcpath + 'img/*')
    .pipe(gulp.dest(destpath + 'img/'));
});
