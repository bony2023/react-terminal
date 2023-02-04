import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json" assert {type: "json"};
import typescriptModule from "typescript";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    postcss({
      extract: false,
      modules: true,
      use: ["sass"]
    }),
    typescript({
      typescript: typescriptModule
    }),
    process.env.NODE_ENV === "production" ? terser() : null
  ]
};
