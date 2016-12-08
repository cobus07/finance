var gulp = require('gulp');
var fs = require('fs');
var minhtml = require('gulp-htmlmin');
var mincss = require('gulp-uglifycss');
var minjs = require('gulp-uglifyjs');
var rename = require('gulp-rename');
var pump = require('pump');
var rjs = require('requirejs');

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

gulp.task('default', ['requirejs_pack'], function() {
  // compress html css js files in folder src
  gulp.watch('frontend/src/**', ['requirejs_pack']);
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
        'node_modules/bootstrap/dist/bootstrap.min.js',
        'node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'
      ]),
    rename(function(path) {
      if (path.extname == '.js') {
        path.basename = path.basename.replace(/[\.-]min/, '');
      }
    }),
    gulp.dest('frontend/public/lib/')],
    showError
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
      'node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css',
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
    gulp.dest(destpath + 'css/')],
    showError
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
    gulp.dest(destpath)],
    showError
  );

  // compress js files
  pump([
    gulp.src(srcpath + '*.js'),
    gulp.dest(destpath)],
    showError
  );

  pump([
    gulp.src(srcpath + 'lib/*.js'),
    gulp.dest(destpath + 'lib/')],
    showError
  );

  pump([
    gulp.src(srcpath + 'collections/*.js'),
    gulp.dest(destpath + 'collections/')],
    showError
  );

  pump([
    gulp.src(srcpath + 'models/*.js'),
    gulp.dest(destpath + 'models/')],
    showError
  );

  pump([
    gulp.src(srcpath + 'views/*.js'),
    gulp.dest(destpath + 'views/')],
    showError
  );

  pump([
    gulp.src(srcpath + 'utility/*.js'),
    gulp.dest(destpath + 'utility/')],
    showError
  );

  // move favicon.ico to public/
  pump([
    gulp.src(srcpath + '*.ico'),
    gulp.dest(destpath)],
    showError
  );

  // move templetes to public/tpl/
  pump([
    gulp.src(srcpath + 'tpl/*.html'),
    minhtml({
      minifyCSS: true,
      minifyJS: true,
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
      quoteCharacter: '\'',
      removeComments: true,
      sortAttributes: true,
    }),
    gulp.dest(destpath + 'tpl/')],
    showError
  );

  // move images from src/img folder to public/img
  pump([
    gulp.src(srcpath + 'img/*'),
    gulp.dest(destpath + 'img/')],
    showError
  );

  // move fonts from src/fonts/ to public/fonts
  pump([
    gulp.src(srcpath + 'fonts/*'),
    gulp.dest(destpath + 'fonts/')],
    showError
  );
});

gulp.task('requirejs_pack', ['libs', 'compress'], function() {
  var config = {
    baseUrl: './frontend/public',
    paths: {
      'jquery': './../../node_modules/jquery/dist/jquery.min',
    },
    name: 'app',
    out: './frontend/public/main.js',
  };
  rjs.optimize(config, function() {
  }, function(err) {
    console.log(err);
  });
});

function showError(err) {
  if (err) {
    console.log(err);
  }
};
