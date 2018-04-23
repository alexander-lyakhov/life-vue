var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin')
var path = require('path');


const NODE_ENV = process.env.NODE_ENV || 'development';

var projectName = 'Life-vue';
var projectPath = path.resolve(__dirname, projectName);

module.exports = {

    context: projectPath,

    //=======================================================================================================
    //  For cases when we should copy 'index.html' file into 'dist' directory
    //=======================================================================================================
    /*
    entry: [
        './index-template.html',
        './src/main.js'
    ],
    */

    entry: {
        app: './src/main.js'
    },

    output: {
        path: path.resolve(projectPath, 'dist'),
        filename: './build.js'
    },

    //=======================================================================================================
    //  Watch for changes in development mode only
    //=======================================================================================================
    watch: NODE_ENV === 'development',

    //=======================================================================================================
    //  Make source-map enabled in development mode only
    //=======================================================================================================
    devtool: NODE_ENV === 'development' ? 'source-map':false,

    //=======================================================================================================
    //  Set server path to project folder
    //=======================================================================================================
    devServer: {
        contentBase: projectPath
    },

    //=======================================================================================================
    //  Set alias to include 'vue.esm.js' build as 'vue' to use it with modedrn builders such as webpack 2.0+
    //=======================================================================================================
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },

    module: {
        rules: [

            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {loader: 'css-loader', options: {minimize: NODE_ENV === 'production'}}
                    ]
                })

            },

            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {loader: 'css-loader', options: {minimize: NODE_ENV === 'production'}},
                        {loader: 'sass-loader'}
                    ]
                })
            },

            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {loader: 'css-loader', options: {minimize: NODE_ENV === 'production'}},
                        {loader: 'sass-loader?indentedSyntax'}
                    ]
                })
            },

            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            },

            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: true,
                    loaders: {
                        js: 'babel-loader',
                        scss: 'vue-style-loader!css-loader?minimize=true!sass-loader?outputStyle=expanded',
                        sass: 'vue-style-loader!css-loader?minimize=true!sass-loader?indentedSyntax'
                    }
                }
            },

            /*
             *  Rules for images
             */
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/images',
                    publicPath: 'assets/images' // prefix for compiled css
                }
            },

            /*
             *  Rules for fonts
             */
            {
                test: /\.(eot|ttf|eof|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/fonts',
                    publicPath: 'assets/fonts' // prefix for compiled css
                }
            },

            /*
             *  Copy index.html in 'dist' directory
             */
            {
                test: /\.html$/,
                loader: 'file-loader',
                options: {
                    name: 'index.html',
                    outputPath: '/',
                    publicPath: '/'
                }
            },

            /*
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader?limit=1024'
            }
            */
        ]
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),

        new ExtractTextPlugin("./build.css", {allChunks: true}),

        new CopyWebpackPlugin([{
            from: 'src/assets',
            to: 'assets/images',
            toType: 'dir'
        }])

        /*
        new HtmlWebpackPlugin({
            title: 'Life Vue',
            template: './src/index.html',
            minify: NODE_ENV === 'production'
        })
        */
   ]
};

if (process.env.NODE_ENV === 'production') {

    module.exports.plugins = (module.exports.plugins || []).concat([
        new UglifyJSWebpackPlugin({
            sourceMap: false,
        })
    ])
}