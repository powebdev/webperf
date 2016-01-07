// Include gulp
var gulp = require('gulp');
// Include plugins
var merge = require('merge-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var htmlmin = require('gulp-htmlmin');
var htmlreplace = require('gulp-html-replace');
var fs = require('fs');
var strreplace = require('gulp-replace');
var stripcomments = require('gulp-strip-comments');

// Minify JS Files
gulp.task('scripts', function() {
	var main_site = gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('build/js'))
		.pipe(gulp.dest('src/js/min'));

	var pizza_site = gulp.src('src/views/js/*.js')
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('build/views/js'))
		.pipe(gulp.dest('src/views/js/min'));

	return merge(main_site, pizza_site);
});

// CSS minify
gulp.task('style', function() {
	var main_site = gulp.src('src/css/*.css')
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('build/css'))
		.pipe(gulp.dest('src/css/min'));


	var pizza_site = gulp.src('src/views/css/*.css')
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('build/views/css'))
		.pipe(gulp.dest('src/views/css/min'));

	return merge(main_site, pizza_site);
});

gulp.task('prod_dev_switch', function() {
	var css_min = fs.readFileSync('src/css/min/style.min.css', 'utf8');
	var main_site = gulp.src('src/*.html')
		.pipe(strreplace('<!--Start Prod Scripts','<!--Start Prod Scripts-->'))
		.pipe(strreplace('End Prod Scripts-->','<!--End Prod Scripts-->'))
		.pipe(strreplace('<!--Start Dev Scripts-->','<!--Start Dev Scripts'))
		.pipe(strreplace('<!--End Dev Scripts-->','End Dev Scripts-->'))
		.pipe(strreplace('<link href="css/style.css" rel="stylesheet">', '<style>%css_here%</style>'))
		.pipe(strreplace('%css_here%', css_min))
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(stripcomments())
		.pipe(gulp.dest('build'));

	var pizza_css_min = fs.readFileSync('src/views/css/min/style.min.css', 'utf8');
	var pizza_css_grid_min = fs.readFileSync('src/views/css/min/bootstrap-grid.min.css', 'utf8');
	var pizza_js_min = fs.readFileSync('src/views/js/min/main.min.js', 'utf8');
	var pizza_site = gulp.src('src/views/*.html')
		.pipe(strreplace('<!--Start Prod Scripts','<!--Start Prod Scripts-->'))
		.pipe(strreplace('End Prod Scripts-->','<!--End Prod Scripts-->'))
		.pipe(strreplace('<!--Start Dev Scripts-->','<!--Start Dev Scripts'))
		.pipe(strreplace('<!--End Dev Scripts-->','End Dev Scripts-->'))
		.pipe(strreplace('<link rel="stylesheet" href="css/style.css">', '<style>%css1_here%</style>'))
		.pipe(strreplace('<link rel="stylesheet" href="css/bootstrap-grid.css">', '<style>%css2_here%</style>'))
		.pipe(strreplace('%css1_here%', pizza_css_min))
		.pipe(strreplace('%css2_here%', pizza_css_grid_min))
		.pipe(strreplace('<script type="text/javascript" src="js/main.js"></script>', '<script>%js_here%</script>'))
		.pipe(strreplace('%js_here%', pizza_js_min))
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(stripcomments())
		.pipe(gulp.dest('build/views'));

	return merge(main_site, pizza_site);
});


 // Default Task
gulp.task('default', ['scripts', 'style']);
gulp.task('default', ['prod_dev_switch']);
