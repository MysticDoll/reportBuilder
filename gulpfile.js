var gulp = require('gulp');
var notify = require('gulp-notify');
var buffer = require('gulp-buffer');
var webserver = require('gulp-webserver');
var mathjax = require('mathjax_markdown');
var errHandler = function(){
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error %>"
  }).apply(this, args);

  this.emit('end');
};

gulp.task('build', function () {
  mathjax.md_to_html("./src/report.md", "./dest/index.html");
  mathjax.md_to_pdf("./src/report.md", "./dest/report.pdf");
});

gulp.task('server', function(){
  gulp.src('dest')
    .pipe(webserver({
      livereload: true,
      https: false,
      open: true
    }));
});

gulp.task('watch',['server'], function(){
  gulp.watch('./src/*.pdf',['build']);
});

gulp.task('default', ['build', 'watch', 'server']);
