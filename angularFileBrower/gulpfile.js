'use strict';

var gulp = require('gulp');
var gulpLess = require('gulp-less');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var del = require('del');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var license = require('gulp-licenser');
var mainBowerFiles = require('main-bower-files');

var LICENSE_TEMPLATE =
    '/**\n\
     * @author: \n\
     *    wiseman\n\
     * @version: \n\
     *    v0.0.1\n\
     * @license:\n\
     *    Copyright 2016, 上海海翼知信息科技有限公司. All rights reserved.\n\
     */';

var dst = 'dist/';
var lib = 'lib/';
var libs = 'libs/';


var src = 'src/';
var jsVendorFile = 'vendor.min.js';
var cssVendorFile = 'vendor.min.css';
var templateFile = 'file-browser-template.js';
var jsFile = 'file-browser.min.js';
var jsDevFile = 'file-browser.js';
var cssFile = 'file-browser.min.css';
var cssDevFile = 'file-browser.css';

gulp.task('clean-js', function (cb) {
    return del([dst + jsFile,dst + jsDevFile,dst + templateFile], cb);
});

gulp.task('concat-js', ['cache-templates'], function() {
    return gulp.src([
        src + 'js/**/*.module.js',
        src + 'js/**/*.js',
        dst + '/' + templateFile
    ])
        .pipe(concat(jsDevFile))
        .pipe(gulp.dest(dst));
});

gulp.task('uglify-js', ['concat-js'], function() {
    return gulp.src(dst + jsDevFile)
        .pipe(concat(jsFile))
        .pipe(uglify())
        .pipe(gulp.dest(dst));
});

gulp.task('clean-css', function (cb) {
    return del([dst + cssFile,dst + cssDevFile,src + '/css/**'], cb);
});

gulp.task('compile-less',['clean-css'], function () {
    return gulp.src(src + '**/*.less')
        .pipe(gulpLess())
        .pipe(gulp.dest(src + 'css'));
});

gulp.task('concat-css', ['compile-less'], function() {
    return gulp.src(src + 'css/**/*.css')
        .pipe(concat(cssDevFile))
        .pipe(gulp.dest(dst));
});

gulp.task('minify-css', ['concat-css'], function() {
    return gulp.src(dst + cssDevFile)
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(concat(cssFile))
        .pipe(gulp.dest(dst));
});

gulp.task('cache-templates', ['clean-js'], function () {
    return gulp.src(src + '**/*.html')
        .pipe(templateCache(templateFile, {
            root: src,
            module: 'fb'
        }))
        .pipe(gulp.dest(dst));
});

gulp.task('rev', ['uglify-js', 'minify-css'], function () {
    return gulp.src([dst + cssFile,dst + jsFile])
        .pipe(rev())
        .pipe(gulp.dest(dst))
        .pipe(rev.manifest())
        .pipe(gulp.dest(dst));
});

gulp.task('rev-replace', ['rev'], function () {
    var manifest = gulp.src(dst + "rev-manifest.json");
    return gulp.src('index.html')
        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest(''));
});

gulp.task('update-license', ['uglify-js', 'minify-css'], function() {
    gulp.src(dst + '/*')
        .pipe(license(LICENSE_TEMPLATE))
        .pipe(gulp.dest(dst))
});

gulp.task('clean-lib', function (cb) {
    return del([lib + '*.*'], cb);
});

gulp.task('main-bower-file',['clean-lib'], function() {
    return gulp.src(mainBowerFiles({
        'overrides': {
            'material-design-icons':{'main': [
                'iconfont/material-icons.css',
                'iconfont/MaterialIcons-Regular.eot',
                'iconfont/MaterialIcons-Regular.ijmap',
                'iconfont/MaterialIcons-Regular.svg',
                'iconfont/MaterialIcons-Regular.ttf',
                'iconfont/MaterialIcons-Regular.woff',
                'iconfont/MaterialIcons-Regular.woff2'
            ]},
            'ng-file-upload':{'main': [
                'ng-file-upload-all.js'
            ]},
            'angular-resizable':{'main': [
                'angular-resizable.min.css',
                'angular-resizable.min.js'
            ]}
        }
    }))
        .pipe(gulp.dest(lib))
});


gulp.task('clean-vendor-js', ['main-bower-file'], function (cb) {
    return del([libs + jsVendorFile], cb);
});

gulp.task('clean-vendor-css', ['main-bower-file'], function (cb) {
    return del([libs + cssVendorFile], cb);
});

gulp.task('uglify-vendor-js', ['clean-vendor-js'], function() {
    return gulp.src([
        lib + 'jquery.js',
        lib + 'angular.js',
        lib + 'underscore.js',
        lib + 'restangular.js',
        lib + 'angular-translate.js',
        lib + 'angular-animate.js',
        lib + 'angular-aria.js',
        lib + 'angular-ui-router.js',
        lib + 'angular-messages.js',
        lib + 'angular-material.js',
        lib + 'angular-local-storage.js',
        lib + 'angular-sanitize.js',
        lib + 'moment.js',
        lib + 'tv4.js',
        lib + 'ObjectPath.js',
        lib + 'schema-form.js',
        lib + 'ng-file-upload-all.js',
        lib + 'material-decorator.js',
        lib + 'schema-form-file.js',
        lib + 're-tree.js',
        lib + 'ng-device-detector.js',
        lib + 'ng-sortable.js',
        lib + 'angular-resizable.min.js',
        '../angular-schema-form-material/material-decorator.js',
        '../angular-schema-form-nwp-file-upload/dist/schema-form-file.min.js'
    ])
        .pipe(concat(jsVendorFile))
        .pipe(uglify())
        .pipe(gulp.dest(libs));
});

gulp.task('minify-vendor-css', ['clean-vendor-css'], function() {
    return gulp.src([
        lib + 'angular-material.css',
        lib + 'material-icons.css',
        lib + 'ng-sortable.css',
        lib + 'angular-resizable.min.css',
        '../angular-schema-form-nwp-file-upload/dist/schema-form-file.min.css'
    ])
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(concat(cssVendorFile))
        .pipe(gulp.dest(libs));
});

gulp.task('vendor',['uglify-vendor-js','minify-vendor-css']);

gulp.task('watch', function () {
    gulp.watch([src + '**/*.less'], ['concat-css']);
    gulp.watch([src + 'js/**/*.module.js',src + 'js/**/*.js',src + 'js/**/*.html'], ['concat-js','lint']);
});

gulp.task('lint', function () {
    return gulp.src([src + '**/*.js'])
        .pipe(eslint({
            'rules': {
                'quotes': [2, 'single'],
                'semi': [2, 'always']
            },
            'env': {
                'browser': true
            },
            'globals': {
                'angular': true,
                'jQuery': true,
                'moment': true
            },
            'extends': 'eslint:recommended'
        }))
        .pipe(eslint.format());
});

gulp.task('clean-vendor-lib', function (cb) {
    return del([lib + "*.*"], cb);
});

gulp.task('lib', ['clean-vendor-lib', 'vendor'],function () {
    return gulp.src([lib + '*.*', '!' + lib + '*.js', '!' + lib + '*.css']).pipe(gulp.dest(libs));
});

gulp.task('build', ['lint', 'update-license']);

gulp.task('default', ['lint', 'lib', 'update-license']);
