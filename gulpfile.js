var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

  /*gulp.task('hello', async function() {
    console.log('Hello Zell');
  }); */

  /*gulp.task('hello', done => {
    console.log('Hello Zell');
    done();
  });*/

  gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
      .pipe(sass())
      .pipe(gulp.dest('app/css'))
      .pipe(browserSync.reload({
        stream: true
      }))
  });

// Gulp 3.x watch syntax
//gulp.watch('files-to-watch', ['tasks', 'to', 'run']);//

// NOTE! Gulp 4.x watch syntax (all the rest of the examples would need to be like this for Gulp 4
/*gulp.watch('files-to-watch', gulp.series(['tasks', 'to', 'run']));*/

gulp.task('watch', gulp.series('browserSync', 'sass'), function (){
  gulp.watch('app/scss/**/*.scss', gulp.series('sass')); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});


//Live-reloading with Browser Sync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

/*It’ll be cumbersome to open up two command line windows and run gulp browserSync and gulp watch separately, so let’s get Gulp to run them together by telling the watch task that browserSync must be completed before watch is allowed to run.*/
/*gulp.task('watch', ['array', 'of', 'tasks', 'to', 'complete','before', 'watch'], function (){
  // ...
}) - syntax*/