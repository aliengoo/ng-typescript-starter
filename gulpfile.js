var gulp = require('gulp');
var lp = require('gulp-load-plugins')({
  lazy: true
});
var config = require('./gulp.config')();
var args = require('yargs').argv;
var del = require('del');
var fs = require('fs');
var path = require('path');

var bowerFiles = require('main-bower-files');

var mainBowerFilesOptions = {};

if (args.verbose) {
  mainBowerFilesOptions.debugging = true;
}

// clean your builds
gulp.task("clean:appjs", function (done) {
  clean(path.join(config.temp, "app.js"), done);
});

gulp.task("clean:templatesjs", function (done) {
  clean(path.join(config.temp, "templates.js"), done);
});

// Clean styles from temporary directory
gulp.task("clean:styles", function (done) {
  clean(config.temp + "*.css", done);
});

// build styles from SCSS files, then autoprefix, finally livereload
gulp.task("styles", ["clean:styles"], function () {

  log("Compiling sass, and autoprefixing...");

  return lp.rubySass(config.sass)
    .pipe(lp.if(args.verbose, lp.print()))
    .pipe(lp.plumber())
    .pipe(lp.autoprefixer({browsers: ["last 2 version", "> 5%"]}))
    .pipe(gulp.dest(config.client.assetsFolder))
    .pipe(lp.livereload());
});

gulp.task('build', ['js:build', 'templates:build'], function () {
  log("Preparing final application JavaScript file...");

  return gulp.src(path.join(config.temp, '*.js'))
    .pipe(lp.if(args.verbose, lp.print()))
    .pipe(lp.concat(config.client.appJsFile))
    .pipe(lp.if(args.production, lp.sourcemaps.init()))
    .pipe(lp.if(args.production, lp.uglify({
      mangle: false
    })))
    .pipe(lp.if(args.production, lp.sourcemaps.write()))
    .pipe(gulp.dest(config.client.jsFolder))
    .pipe(lp.livereload());
});

gulp.task('ts:build', ['clean:appjs'], function () {

  // builds the typescript files and plonks them into temp
  var tsResult = gulp.src('app/**/*.ts')
    .pipe(lp.typescript({
      noImplicitAny: true,
      out: 'app.js'
    }));

  return tsResult.js.pipe(gulp.dest(config.temp));
});

gulp.task('js:build', ['ts:build'], function () {
  return gulp.src(path.join(config.temp, 'app.js'))
    .pipe(lp.ngAnnotate())
    .pipe(gulp.dest(config.temp));
});

gulp.task('templates:build', ['clean:templatesjs'], function () {
  // converts jade files into regular html files, the compiles them into the template cache

  var htmlFilter = lp.filter(config.mainBowerFilterFilters.html);
  var jadeFilter = lp.filter(config.mainBowerFilterFilters.jade);

  return gulp.src('./app/**/*')
    .pipe(lp.plumber())
    .pipe(htmlFilter)
    .pipe(lp.if(args.verbose, lp.print()))
    .pipe(lp.angularTemplatecache({
      module: 'app.templates',
      standalone: true
    }))
    .pipe(htmlFilter.restore())
    .pipe(jadeFilter)
    .pipe(lp.if(args.verbose, lp.print()))
    .pipe(lp.jade())
    .pipe(lp.angularTemplatecache({
      module: 'app.templates',
      standalone: true
    }))
    .pipe(lp.concat('templates.js'))
    .pipe(gulp.dest(config.temp));
});

// compiles js files into vendor.js based on {package}/bower.json/main property
gulp.task("bower:js", function () {
  var jsFilter = lp.filter(config.mainBowerFilterFilters.js);

  return gulp.src(bowerFiles(mainBowerFilesOptions))
    .pipe(lp.addSrc(config.additionalVendorFiles))
    .pipe(jsFilter)
    .pipe(lp.if(args.verbose, lp.print()))
    .pipe(lp.concat(config.client.vendorJsFile))
    .pipe(lp.if(args.production, lp.uglify(config.uglify)))
    .pipe(gulp.dest(config.client.jsFolder));
});

// Compiles bower CSS dependencies
gulp.task("bower:css", function () {
  var cssFilter = lp.filter(config.mainBowerFilterFilters.css);

  return gulp.src(bowerFiles(mainBowerFilesOptions))
    .pipe(lp.addSrc(config.additionalVendorFiles))
    .pipe(cssFilter)
    .pipe(lp.concat(config.client.vendorCssFile))
    .pipe(lp.if(config.fontLocation, lp.replace(config.fontLocation.find, config.fontLocation.replaceWith)))
    .pipe(lp.minifyCss())
    .pipe(gulp.dest(config.client.assetsFolder));
});

// move any other files that are not JS or CSS into the assets folder
// TODO: To include or exclude files, change config.mainBowerFilterFilters.assets glob
gulp.task("bower:assets", function () {
  var assetsFilter = lp.filter(config.mainBowerFilterFilters.assets);

  return gulp.src(bowerFiles(mainBowerFilesOptions))
    .pipe(lp.addSrc(config.additionalVendorFiles))
    .pipe(assetsFilter)
    .pipe(gulp.dest(config.client.assetsFolder));
});

// Runs all bower tasks
gulp.task("bower", ["bower:js", "bower:css", "bower:assets"], function (done) {
  done();
  log("bower completed");
});

gulp.task('webserver', function () {
  gulp.src('public').pipe(lp.webserver({
    fallback: 'index.html',
    port: 3000
  }));
});

gulp.task('nodemonserver', function () {
  lp.nodemon({
    script: './server/server.js',
    ext: 'js',
    watch : "./server",
    nodeArgs: ["--debug", "--harmony"],
    execMap: {
      "js": "node"
    },
    env: {
      'NODE_ENV': 'development'
    }
  });
});


gulp.task('default', ['styles', 'bower', 'build'], function(){
  lp.livereload.listen({
    start: true
  });

  gulp.watch('app/**/*', ['build']);
  gulp.watch('styles/**/*', ['styles']);

  if (args.webserver){
    gulp.start('webserver');
  }

  if (args.nodemon){
    gulp.start('nodemonserver');
  }
});

function clean(path, done) {
  log("Cleaning: " + path);

  del(path, done);
}

// logs a message
function log(message) {
  var printFn = lp.util.colors.magenta.bold;

  if (typeof (message) === "object") {
    for (var item in message) {
      if (message.hasOwnProperty(item)) {
        lp.util.log(printFn(message[item]));
      }
    }
  } else {
    lp.util.log(printFn(message));
  }
}