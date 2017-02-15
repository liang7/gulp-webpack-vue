cd 目录后运行： npm install （在node环境下）

## 1.build目录
存放前端代码打包的配置代码

## 2.release目录
存放打包生成的生产环境代码

## 3.src目录
存放前端代码源码

## 4.package.json
记录打包依赖的模块

## 5.使用方法

### 5.1开发
运行 gulp lib 合并依赖库文件（执行过一次后就不需再运行除非js库变化）

### 5.2开发
运行 gulp dev
此命令会启动一个webpack dev server，更新代码后会实时更新打包文件

访问http://localhost:8080/release 可以查看效果
### 5.3打包测试代码
运行 gulp test，生成文件在release目录，可直接打开index.html

### 5.4打包线上代码
运行 gulp build，生成文件在release目录，可直接打开index.html
