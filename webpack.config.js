module.exports = {
    entry: './src/app.tsx',
    output: {
      path: __dirname + '/public',
      filename: 'build/app.js'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: ['babel-loader', 'ts-loader'] },
        {
          test: /\.(ts|tsx)$/,
          enforce: 'pre',
          use: [
            {
              options: {
                eslintPath: require.resolve('eslint'),
      
              },
              loader: require.resolve('eslint-loader'),
            },
          ],
          exclude: /node_modules/,
        }
      ]
    }
  }