const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/js/App.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundled.js'
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loaders: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react',
                        {
                            'plugins': ['@babel/plugin-proposal-class-properties']
                        }
                    ],
                }
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}
