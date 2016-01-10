var path = require('path');
var webpack = require('webpack');
var ROOT_DIR = __dirname;

module.exports = {
    context: ROOT_DIR,
    entry: [
        path.resolve(ROOT_DIR, 'src', 'index.js')
    ],

    resolve: {
        extensions: ['', '.js', '.jsx', '.es6.js'],
        alias : {
            react: path.join(__dirname, 'node_modules', 'react'),
            components: path.join(ROOT_DIR, 'src', 'js', 'components'),
            stylesheets: path.join(ROOT_DIR, 'src', 'stylesheets'),
            images: path.join(ROOT_DIR, 'src', 'imgs')
        }
    },

    output: {
        path: path.join(ROOT_DIR,'lib'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({ // Optimize the JavaScript...
            compress: {
                warnings: false // ...but do not show warnings in the console (there is a lot of them)
            }
        }),

        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: path.join(ROOT_DIR, 'node_modules'),
                query: {
                    "presets": ["es2015", "react", "stage-0"]
                }
            },

            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },

            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=1000000'
            }
        ]
    }
};
