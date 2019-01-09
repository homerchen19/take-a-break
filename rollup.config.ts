import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

const pkg = require('./package.json')

const libraryName = 'take-a-rest'

export default {
  input: `src/${libraryName}.ts`,
  output: [{ file: pkg.main, name: 'cli', format: 'cjs' }],
  watch: {
    include: 'src/**'
  },
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [typescript({ useTsconfigDeclarationDir: true }), terser()]
}
