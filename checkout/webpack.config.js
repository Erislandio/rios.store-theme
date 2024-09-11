const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  entry: ['./src/ts/checkout6-custom.ts', './src/scss/checkout6-custom.scss'],
  target: ['web', 'es5'],
  output: {
    filename: 'checkout6-custom.js',
    path: path.resolve(__dirname, './checkout-ui-custom/'),
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css',
            },
          },
          {
            loader: 'extract-loader',
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@constants': path.resolve(__dirname, 'src/ts/constants'),
      '@utils': path.resolve(__dirname, 'src/ts/utils'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new ESLintPlugin({ files: '**/*.{ts,tsx,js,jsx}', fix: true }),
    new StylelintPlugin({ fix: true }),
  ],
}
