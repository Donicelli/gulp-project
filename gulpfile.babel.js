import babel from 'gulp-babel'
import concat from 'gulp-concat'
import del from 'del'
import gulp from 'gulp'
import uglify from 'gulp-uglify'
import browserSync from 'browser-sync'
import sass from 'gulp-sass'
import cleanCSS from 'gulp-clean-css'
import rename from 'gulp-rename'

const server = browserSync.create()

const paths = {
  scripts: {
    src: 'app/src/js/*.js',
    dest: 'app/dist/'
  },
  styles: {
    src: 'app/src/css/*.scss',
    dest: 'app/dist/'
  },
  html: 'app/index.html'
}

export const clean = () => del([ 'dist' ])

export const styles = done => {
  gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.styles.dest))
  done()
}

export const scripts = done => {
  gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest(paths.scripts.dest))
  done()
}

const reload = done => {
  server.reload()
  done()
}

const serve = done => {
  server.init({
    server: {
      baseDir: './app'
    }
  })
  done()
}

const watch = () => {
  gulp.watch(paths.scripts.src, gulp.series(scripts, reload))
  gulp.watch(paths.styles.src, gulp.series(styles, reload))
  gulp.watch(paths.html, reload)
}

const dev = gulp.series(clean, scripts, serve, watch)
export default dev
