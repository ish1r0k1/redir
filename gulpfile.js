"use strict"

let
  gulp = require("gulp"),
  $ = require("gulp-load-plugins")(),
  pkg = require("./package.json");

const PATHS = {
  scripts: {
    src: "src",
    dist: "dist"
  }
};

const CONFIG = {
  banner: ["/**",
    " * <%= pkg.name %> - <%= pkg.description %>",
    " * @version v<%= pkg.version %>",
    " * @author @ish1r0k1",
    " * @license <%= pkg.license %>",
    " */",
    ""].join("\n")
};

gulp.task("lint", () => {
  gulp.src(`${PATHS.scripts.src}/*.js`)
  .pipe($.eslint());
});

gulp.task("build", () => {
  gulp.src(`${PATHS.scripts.src}/*.js`)
  .pipe($.header(CONFIG.banner, { pkg, pkg }))
  .pipe(gulp.dest(PATHS.scripts.dist));
});

gulp.task("minify", () => {
  gulp.src([`${PATHS.scripts.dist}/*.js`, `!${PATHS.scripts.dist}/*.min.js`])
  .pipe($.uglify({
    preserveComments: 'license'
  }))
  .pipe($.rename({ suffix: ".min" }))
  .pipe(gulp.dest(PATHS.scripts.dist));
});


gulp.task("watch", () => {
  $.watch([`${PATHS.scripts.src}/*.js`], () => {
    gulp.start(["build"]);
  });
});
