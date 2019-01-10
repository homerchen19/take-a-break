import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

const pkg = require('./package.json');

export default {
  input: `src/${pkg.name}.ts`,
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

  plugins: [typescript({ useTsconfigDeclarationDir: true }), terser()],
};
