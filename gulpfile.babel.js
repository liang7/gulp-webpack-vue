import gulp from 'gulp'
import gutil from 'gulp-util'
import concat from 'gulp-concat'
import webpack from 'webpack'
import webpackConfigDev from './build/webpack.config.dev.js'
import webpackConfigTest from './build/webpack.config.test.js'
import webpackConfigPro from './build/webpack.config.pro.js'
import WebpackDevServer from 'webpack-dev-server'
import elementConfig from './build/element.config.js'
import del from 'del'

//清理生产目录文件
gulp.task('clean', function(cb){
    del(['release/*', '!release/lib'])
});

//合并js库文件
gulp.task('lib',()=>{
    del(['release/lib/*'])
    //打包element的css、字体文件
    webpack(elementConfig, function(err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }
        gutil.log("[webpack]", stats.toString({}));
    });

    gulp.src(['./node_modules/vue/dist/vue.min.js','./node_modules/vue-router/dist/vue-router.min.js','./node_modules/vue-resource/dist/vue-resource.min.js'])
    .pipe(concat('vue.min.js')).pipe(gulp.dest('./release/lib'));

    gulp.src(['./src/lib/element.js'])
    .pipe(concat('element.min.js')).pipe(gulp.dest('./release/lib'));

    gulp.src(['./src/lib/jquery.js','./src/lib/highcharts.js'])
    .pipe(concat('jquery.highcharts.js')).pipe(gulp.dest('./release/lib'));
})

//开发环境，启动hot dev server
gulp.task('webpack-dev',()=>{
    let config = Object.create(webpackConfigDev);
    config.entry.app.unshift("webpack-dev-server/client?http://0.0.0.0:8080/", "webpack/hot/dev-server");
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    let compiler = webpack(config);
    let server = new WebpackDevServer(compiler, {
        contentBase: "./",
        publicPath: "/release",
        hot: true,
        compress: false,
        stats: { colors: true },
        proxy: {  //设置代理
            '/hebaobackapi/*': {  
                target: 'http://111.222.68.133:82/',//(此地址是乱写的)
                secure: false
            }  
        }  
    });
    server.listen(8080, "0.0.0.0", () => console.log("server start on localhost:8080"));
});

//使用测试配置打包任务
gulp.task('webpack-test',() => {
    let config = Object.create(webpackConfigTest);
    webpack(config, function(err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }
        gutil.log("[webpack]", stats.toString({}));
    });
});

//正式配置打包任务
gulp.task('webpack-build',() => {
    let config = Object.create(webpackConfigPro);
    webpack(config, function(err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }
        gutil.log("[webpack]", stats.toString({}));
    });
});

//启动开发环境，启动后访问 http://localhost:8080/release 即可
gulp.task("dev",["webpack-dev"]);

//打包测试环境
gulp.task("test",["clean","webpack-test"]);

//打包正式环境
gulp.task("build",["clean","webpack-build"]);