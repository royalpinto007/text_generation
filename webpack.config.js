const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

function getDirectories(srcpath) {
  return fs
    .readdirSync(srcpath)
    .filter((item) => fs.statSync(path.join(srcpath, item)).isDirectory());
}

module.exports = [];
getDirectories('./js/ckeditor5_plugins').forEach((dir) => {
  const bc = {
    mode: 'production',
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
          },
          test: /\.js(\?.*)?$/i,
          extractComments: false,
        }),
      ],
      moduleIds: 'named',
    },
    entry: path.resolve(__dirname, 'js/ckeditor5_plugins', dir, 'src/index.js'),
    output: {
      path: path.resolve(__dirname, './js/build'),
      filename: `${dir}.js`,
      library: ['CKEditor5', dir],
      libraryTarget: 'umd',
      libraryExport: 'default',
    },
    plugins: [
      new webpack.DllReferencePlugin({
        manifest: require('ckeditor5/build/ckeditor5-dll.manifest.json'), // eslint-disable-line global-require, import/no-unresolved
        scope: 'ckeditor5/src',
        name: 'CKEditor5.dll',
      }),
    ],
    module: {
      rules: [
        { test: /\.svg$/, use: 'raw-loader' },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] }
      ],
    },
  };

  module.exports.push(bc);
});
