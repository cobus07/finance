var gulp = require('gulp');
var fs = require('fs');
var minhtml = require('gulp-htmlmin');
var mincss = require('gulp-uglifycss');
var minjs = require('gulp-uglifyjs');
var rename = require('gulp-rename');
var pump = require('pump');

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
  pump([
    gulp.src([
        'node_modules/backbone/backbone-min.js',
        'node_modules/backbone/backbone-min.map',
        'node_modules/underscore/underscore-min.js',
        'node_modules/underscore/underscore-min.map',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/jquery/dist/jquery.min.js.map',
        'node_modules/bootstrap/dist/bootstrap.min.js',
      ]),
    rename(function(path) {
      if (path.extname == '.js') {
        path.basename = path.basename.replace(/[\.-].*$/, '');
      }
    }),
    gulp.dest('frontend/public/lib/')]
  );

  // compress js before moving
  pump([
    gulp.src(['node_modules/requirejs/require.js']),
    minjs(),
    gulp.dest('frontend/public/lib/')]
  );

  pump([
    gulp.src(['node_modules/text/text.js']),
    minjs(),
    gulp.dest('frontend/public/lib/')]
  );

  // move css libs to frontend/public/css/
  pump([
    gulp.src([
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/css/bootstrap.min.css.map',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css.map',
    ]),
    gulp.dest('frontend/public/css/')]
  );

  // move fonts libs to frontend/public/fonts
  pump([
    gulp.src([
      'node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
      'node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
      'node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
      'node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2',
    ]),
    gulp.dest('frontend/public/fonts/')]
  );
});


/*
 * Compress public files include css html and js
 */
gulp.task('compress', function() {
  var srcpath = 'frontend/src/';
  var destpath = 'frontend/public/';

  // compress css files
  pump([
    gulp.src(srcpath + 'css/*.css'),
    mincss({
      'maxLineLen': 80,
      'uglyComments': true}
    ),
    gulp.dest(destpath + 'css/')]
  );

  // compress html files
  pump([
    gulp.src(srcpath + '*.html'),
    minhtml({
      minifyCSS: true,
      minifyJS: true,
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
      quoteCharacter: '"',
      removeComments: true,
      sortAttributes: true,
    }),
    gulp.dest(destpath)]
  );

  // compress js files
  pump([
    gulp.src(srcpath + '*.js'),
    minjs(),
    gulp.dest(destpath)]
  );

  pump([
    gulp.src(srcpath + 'collections/*.js'),
    minjs(),
    gulp.dest(destpath + 'collections/')]
  );

  pump([
    gulp.src(srcpath + 'models/*.js'),
    minjs(),
    gulp.dest(destpath + 'models/')]
  );

  pump([
    gulp.src(srcpath + 'views/*.js'),
    minjs({mangle: false, compress: false}),
    gulp.dest(destpath + 'views/')]
  );

  // move favicon.ico to public/
  pump([
    gulp.src(srcpath + '*.ico'),
    gulp.dest(destpath)]
  );

  // move templetes to public/tpl/
  pump([
    gulp.src(srcpath + 'tpl/*'),
    minhtml({
      minifyCSS: true,
      minifyJS: true,
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
      quoteCharacter: '\'',
      removeComments: true,
      sortAttributes: true,
    }),
    gulp.dest(destpath + 'tpl/')]
  );

  // move images from src/img folder to public/img
  pump([
    gulp.src(srcpath + 'img/*'),
    gulp.dest(destpath + 'img/')]
  );

  // move fonts from src/fonts/ to public/fonts
  pump([
    gulp.src(srcpath + 'fonts/*'),
    gulp.dest(destpath + 'fonts/')]
  );
});
