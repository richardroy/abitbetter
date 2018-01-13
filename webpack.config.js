module.exports = {
  entry: './src/content.ts',
  output: {
    filename: './build/bundle.js'
  },
  target: 'web',
  resolve: {
    extensions: ['.ts']
  },
  module: {
    loaders: [
      { test: /.ts$/, loader: 'awesome-typescript-loader' }
    ]
  }
};