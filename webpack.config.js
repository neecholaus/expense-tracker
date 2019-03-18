const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './client/App.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
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
                test: /.css$/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    }
}
