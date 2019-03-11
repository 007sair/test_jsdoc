const gulp = require("gulp");
const jsdoc = require("gulp-jsdoc3");
const browserSync = require("browser-sync");
const shell = require("shelljs");

gulp.task("server", function() {
  browserSync.init({
    server: {
      baseDir: "./docs"
    },
    port: 3000,
    startPath: "/index.html",
    files: ["docs/**/*"]
  });
});

gulp.task("doc", function(done) {
  gulp.src(["README.md", "src/**/*"]).pipe(
    jsdoc(
      {
        tags: {
          allowUnknownTags: true,
          dictionaries: ["jsdoc", "closure"]
        },
        plugins: [],
        templates: {
          cleverLinks: false,
          monospaceLinks: false
        },
        opts: {
          template: "node_modules/docdash",
          recurse: true,
          encoding: "utf8",
          destination: "./docs/"
        },
        docdash: {
          search: true
        }
      },
      done
    )
  );
});

gulp.task("watch", function() {
  gulp.watch(["src", "README.md"], gulp.series("doc"));
});

gulp.task("clean", function(done) {
  shell.rm("-rf", "docs");
  done();
});

gulp.task("default", gulp.series("clean", gulp.parallel("doc", "server", "watch")));

/** 清理生成目录 */
gulp.task("reset", function(done) {
  shell.rm("-rf", "docs");
  shell.rm("-rf", "node_modules");
  done();
});
