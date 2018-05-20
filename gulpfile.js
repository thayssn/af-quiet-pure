const gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      bs = require('browser-sync').create();

gulp.task('img', () =>
  gulp.src('src/img/**/*')
    .pipe($.plumber())
    .pipe($.newer('./public/assets/img'))
    .pipe($.imagemin())
    .pipe(gulp.dest('./public/assets/img'))
);

gulp.task('fonts', () =>
  gulp.src('./src/scss/fonts/**.**')
    .pipe($.newer('./public/assets/css/fonts'))
    .pipe(gulp.dest('./public/assets/css/fonts'))
);


gulp.task('html', () =>
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./public/'))
    .pipe(bs.stream())
);

gulp.task('css', () =>
  gulp.src('./src/scss/style.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.concat('style.css'))
    .pipe($.autoprefixer())
    .pipe($.sass())
    .pipe($.cleanCss({level: 2}))
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./public/assets/css'))
    .pipe(bs.stream())
);

gulp.task('css-prod', () =>
gulp.src('./src/scss/style.scss')
  .pipe($.concat('style.css'))
  .pipe($.autoprefixer())
  .pipe($.sass())
  .pipe($.cleanCss({level: 2}))
  .pipe($.rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('./public/assets/css'))
  .pipe(bs.stream())
);

gulp.task('js', () =>
  gulp.src('./src/js/**.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.concat('scripts.js'))
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./public/assets/js'))
    .pipe(bs.stream())
);


gulp.task('js-prod', () =>
gulp.src('./src/js/**.js')
  .pipe($.concat('scripts.js'))
  .pipe($.rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('./public/assets/js'))
);

gulp.task('serve', () => {
  bs.init({
    server: {
      baseDir: './public'
    },
    port: 3000
  });

  gulp.watch('config.json', ['fontello', 'css']);
  gulp.watch('./src/index.html', ['html']);
  gulp.watch('./src/js/*.js', ['js']);
  gulp.watch('./src/scss/**/*.scss', ['css']);
  gulp.watch('./src/img/**.**', ['img']);
  gulp.watch('./public/index.html').on('change', bs.reload );
});

gulp.task('default', $.sequence('fonts', 'html', 'js', 'css', 'img', 'serve'));

gulp.task('production', $.sequence('fonts', 'html', 'js-prod', 'css-prod', 'img'));
