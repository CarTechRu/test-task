/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import path from 'path';
import { merge } from 'webpack-merge';
import { fileURLToPath } from 'url';
import common from './common.js';
import env from '../env/dev.ts';

const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url), '../../..'));

export default merge(common, {
  mode: 'development',

  devServer: {
    static: {
      directory: path.join(DIR, './public/'),
    },
    historyApiFallback: {
      disableDotRule: true,
    },
    open: true,
    hot: true,
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        CONFIG: JSON.stringify(env),
      },
    }),
  ],
});
