import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    postcss({
      extract: false,
      modules: true,
      use: ['sass'],
    }),
    typescript({
      /* eslint-disable global-require */
      typescript: require('typescript'),
      /* eslint-enable global-require */
    }),
    process.env.NODE_ENV === 'production' ? terser() : null,
  ],
};
