import autoExternal from 'rollup-plugin-auto-external'
import commonjs from '@rollup/plugin-commonjs'
import del from 'rollup-plugin-delete'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

const config = [
  {
    input: { compile: 'source/compile.ts', compileCoffee: 'source/compileCoffee.ts', compilePug: 'source/compilePug.ts', compileStyl: 'source/compileStyl.ts', compileTs: 'source/compileTs.ts', compileYaml: 'source/compileYaml.ts', index: 'source/index.ts' },
    output: [
      {
        exports: 'named',
        dir: 'dist',
        format: 'cjs',
      },
      {
        exports: 'named',
        dir: 'dist/esm',
        format: 'esm',
      },
    ],
    plugins: [
      del({ targets: 'dist' }),
      autoExternal(),
      typescript({
        check: false,
        tsconfigOverride: {
          compilerOptions: {
            module: 'esnext',
            target: 'es5',
          },
        },
      }),
      resolve(),
      commonjs(),
      json(),
    ],
  },
]

export default config