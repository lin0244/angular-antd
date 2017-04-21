const gulp = require('gulp'),
	  less = require('gulp-less');

gulp.task('Css',function(){
	gulp.src('build/less/antd.less').pipe(less()).pipe(gulp.dest('dist/css'));
});
