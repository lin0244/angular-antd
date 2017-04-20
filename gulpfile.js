const gulp = require('gulp'),
	  less = require('gulp-less');

gulp.task('Css',function(){
	gulp.src('component/less/antd.less').pipe(less()).pipe(gulp.dest('dist/css'));
})