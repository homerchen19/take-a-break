import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';

const pkg = require('./package.json');

export default {
  input: `src/cli.ts`,
  output: [
    {
      file: pkg.main,
      name: 'cli',
      format: 'cjs',
      banner: '#!/usr/bin/env node',
    },
  ],
  watch: {
    include: 'src/**',
  },
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],

  plugins: [
    typescript({ useTsconfigDeclarationDir: true }),
    terser(),
    copy({
      'src/media': 'dist/media',
    }),
  ],
};
