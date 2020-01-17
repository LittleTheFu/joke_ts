module.exports = {
    entry: './src/app.tsx',
    output: {
      path: __dirname + '/public',
      filename: 'app.js'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: ['babel-loader', 'ts-loader'] }
      ]
    }
  }