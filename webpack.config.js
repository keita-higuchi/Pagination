const path = require("path");
import webpack from 'webpack'

module.exports = {

    mode: 'development',
    //mode: 'production',

    entry: {
        example: './src/js/example.js',
    },

    // ビルド後のファイル
    output: {
        path: __dirname + '/example',
        filename: '[name].bundle.js'
    },

    //plugins: [
    //    new webpack.ProvidePlugin({})
    //],

    //resolve: {
    //    alias: {
    //        jquery: path.join(__dirname, 'node_modules', 'jquery')
    //    }
    //},

    devtool: '#sourcemap',
    watch: true,

    // 拡張子が.jsのファイルはbabel-loaderを通してビルド(node_modulesは除外)
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                }
            }
        },{
            test: /\.css$/,
            use: {
                loader: "css-loader",
                options: {
                }
            }
        }]
    }
};




