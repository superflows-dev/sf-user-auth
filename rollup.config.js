/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import summary from 'rollup-plugin-summary';
import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'sf-user-auth.js',
  output: {
    file: 'sf-user-auth.bundled.js',
    format: 'esm',
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    replace({'Reflect.decorate': 'undefined'}),
    resolve({browser: true}),
    json(),
    url({      // <-- and this
      limit: 0,
      include: [
          /.*cldr\/.*\.json/,
          /.*sap.ui.core.*\/SAP-icons.*/,
          /\.properties$/,
      ],
      emitFiles: true,
      fileName: "[name].[hash][extname]",
    }),    
    commonjs(),
    terser({
      ecma: 2017,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    summary(),
  ],
};
