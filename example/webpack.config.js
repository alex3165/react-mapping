const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV;

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    index: './index.tsx',
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
  },
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        loaders: 'style-loader!css-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'React-mapping example',
      template: '../index.ejs',
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
