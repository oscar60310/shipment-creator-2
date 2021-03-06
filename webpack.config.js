/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-undef */
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'client'),
  entry: ['./index'],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: {
          loader: 'ts-loader',
          options: { transpileOnly: true }
        }
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /.svg$/],
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'build', 'static'),
    filename: './[name].[hash:8].js'
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: './index.html'
    }),
    new webpack.DefinePlugin({
      ENV: JSON.stringify({
        name: process.env.NODE_ENV
      })
    })
  ],
  devServer: {
    hot: true
  }
};
