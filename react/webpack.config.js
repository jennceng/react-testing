var webpack = require('webpack');

var config = {
  entry: {
    path: './react/src/main.js',
  },
  output: {
    path: './app/assets/javascripts',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        include: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  resolve: {
    extensions: ['', '.json', '.jsx', '.js']
  },
  devtool: 'eval-source-map',
  plugins: []
}


switch(process.env.NODE_ENV) {
  case 'development':
    config.plugins.push(new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }))
  case 'staging':
    delete config.devtool;
    config.plugins.push(new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"staging"' }))
  case 'production':
    delete config.devtool;
    config.plugins.push(new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }))
}

module.exports = config;
