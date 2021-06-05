// @flow strict-local

import {Runtime} from '@parcel/plugin';
import fs from 'fs';
import path from 'path';

const HMR_RUNTIME = fs.readFileSync(
  path.join(__dirname, './loaders/hmr-runtime.js'),
  'utf8',
);

export default (new Runtime({
  apply({bundle, options}) {
    if (bundle.type !== 'js' || !options.hmrOptions) {
      return;
    }

    const {host, port} = options.hmrOptions;
    return {
      filePath: __filename,
      code:
        `var HMR_HOST = ${JSON.stringify(host != null ? host : null)};` +
        `var HMR_PORT = ${JSON.stringify(port != null ? port : null)};` +
        `var HMR_ENV_HASH = "${bundle.env.id}";` +
        `module.bundle.HMR_BUNDLE_ID = ${JSON.stringify(bundle.id)};` +
        HMR_RUNTIME,
      isEntry: true,
    };
  },
}): Runtime);
