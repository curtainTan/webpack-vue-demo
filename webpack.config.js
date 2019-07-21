const path = require("path")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLplugins = require("html-webpack-plugin")
const webpack = require("webpack")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isDev = process.env.NODE_ENV === "development"


const config= {
    target: "web",
    mode: 'development',
    entry: path.join( __dirname, "src/index.js" ),
    output: {
        filename: "bundle.js",
        path: path.join( __dirname, "dist" )
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                loader: [ 'style-loader', 'css-loader']
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 1024,
                            name: 'static-[name].[ext]'
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env" : {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLplugins(),
        new VueLoaderPlugin()
    ]
}


if( isDev ){
    config.devtool = "#cheap-module-eval-source-map"
    config.module.rules.push(
        {
            test: /\.styl/,
            use: [
                "style-loader",
                "css-loader",
                {
                    loader: "postcss-loader",
                    options: {
                        sourceMap: true
                    }
                },
                "stylus-loader"
            ]
        })
    config.devServer = {
        port: "8000",
        host: "0.0.0.0",
        overlay: {
            error: true,     // 错误显示在网页上
        },
        // open: true,      // 启动后自动打开浏览器
        // historyFallback: {     // 映射地址

        // }
        hot: true,            // 只渲染当前组件，热加载
    }
    config.plugins.push(
        // 热更新
        new webpack.HotModuleReplacementPlugin(),
        // 设置跳过编译时报错, 忽略一些报错信息
        new webpack.NoEmitOnErrorsPlugin()
    )
} else {
    config.mode = 'production'
    config.entry = {
        app: path.join( __dirname, "src/index.js" ),
        vendor: [ "vue" ]
    }
    config.output.filename = "[name].[chunkhash:8].js"
    config.module.rules.push(
        {
            test: /\.styl/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                {
                    loader: "postcss-loader",
                    options: {
                        sourceMap: true
                    }
                },
                "stylus-loader"
            ]
        },
        {
            test: /\.css$/,
            loader: [ MiniCssExtractPlugin.loader, 'css-loader']
        }
    )
    config.plugins.push(
        // CSS 分离 这个因为版本不一样，这里代码不一样
        new MiniCssExtractPlugin({
            filename: 'style-[contentHash:8].css',
            chunkFilename: '[id]-[contentHash:8].css',
        }),
          // 清理dist目录！排除
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!favicon.ico', '!static-*'],
        })
    )
    // config.optimization.splitChunks 配置框架单独打包
    config.optimization = {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    chunks: "initial",
                    minChunks: 2,
                    // 最小多少字节，文件太小，为了测试，这个参数设置为0，这个值默认30000
                    minSize:0
                }
            }
        },
        // runtime缓存单独打包
        runtimeChunk: {
            name: 'runtime'
        },
        // 设置跳过编译时报错
        // noEmitOnErrors: true,
        // 环境变量
        // nodeEnv: 'production'
    }
}


module.exports = config