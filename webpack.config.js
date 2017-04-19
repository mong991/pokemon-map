const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
	  'webpack-dev-server/client',//资源服务器地址
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'build/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: {
            loader: "css-loader"
          }
        })
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    inline: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new ExtractTextPlugin({ 
      filename: 'styles.css' 
    })
  ]
};
