const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  return ({
    stats: 'minimal', // Keep console output easy to read.
    entry: {
      main: './graph/test.ts', // Your program entry point
      graph: ['./js/main_graph.js', './js/utils_graph.js']
    },
    // Your build destination
    output: {
      path: path.resolve(__dirname, '../static'),
      filename: '[name].bundle.js'
    },

    // Config for your testing server
    devServer: {
      compress: true,
      static: false,
      client: {
        logging: "warn",
        overlay: {
          errors: true,
          warnings: false,
        },
        progress: true,
      },
      port: 1234, host: '0.0.0.0'
    },

    performance: { hints: false },

    // Enable sourcemaps while debugging
    devtool: argv.mode === 'development' ? 'eval-source-map' : undefined,

    // Minify the code when making a final build
    optimization: {
      minimize: argv.mode === 'production',
      minimizer: [new TerserPlugin({
        terserOptions: {
          ecma: 6,
          compress: { drop_console: true },
          output: { comments: false, beautify: false },
        },
      })],
    },


    // Explain webpack how to do Typescript
    module: {
      rules: [
        {
          test: /\.ts(x)?$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [
        '.tsx',
        '.ts',
        '.js'
      ]
    },

    plugins: [
      // Make an index.html from the template
      new HtmlWebpackPlugin({
        filename: 'test.html',
        template: 'graph/test.ejs',
        chunks: ['main'],
        hash: true,
        minify: false
      })
      , new HtmlWebpackPlugin({ filename: 'INDEX.html', template: './INDEX.html', chunks: ['graph'] })
      , new HtmlWebpackPlugin({ filename: 'ABOUT.html', template: './ABOUT.html', chunks: ['graph'] })
      , new HtmlWebpackPlugin({ filename: 'GRAPH.html', template: './GRAPH.html', chunks: ['graph', 'main'] })
      , new HtmlWebpackPlugin({ filename: 'THEORY/BISECTION.html', template: './THEORY/BISECTION.html', chunks: [] })
      , new HtmlWebpackPlugin({ filename: 'THEORY/INTRO.html', template: './THEORY/INTRO.html', chunks: [] })
      , new HtmlWebpackPlugin({ filename: 'THEORY/SECANT.html', template: './THEORY/SECANT.html', chunks: [] })
      , new HtmlWebpackPlugin({ filename: 'THEORY/NEWTON.html', template: './THEORY/NEWTON.html', chunks: [] })
    ]
  });
}
