import * as swc from '@swc/core'
import prettier from 'prettier'
import write from 'fire-keeper/dist/write'

// interface

type Option = {
  minify?: boolean
  module?: 'es6' | 'commonjs' | 'umd' | 'amd' | 'nodenext'
  sourceMaps?: boolean
  target?:
    | 'es3'
    | 'es5'
    | 'es2015'
    | 'es2016'
    | 'es2017'
    | 'es2018'
    | 'es2019'
    | 'es2020'
    | 'es2021'
    | 'es2022'
}

// function

const main = async (
  source: `${string}.ts`,
  target = '',
  option: Option = {}
) => {
  try {
    if (source.endsWith('.d.ts')) return
    const t = target || source.replace('.ts', '.js')
    const raw = await swc.transformFile(source, {
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: true,
          decorators: true,
          dynamicImport: true,
        },
        target: option.target || 'es2022',
      },
      minify: !!option.minify,
      module: { type: option.module || 'commonjs' },
      sourceMaps: !!option.sourceMaps,
    })
    const result = option.minify
      ? raw.code
      : prettier.format(raw.code, { parser: 'babel' })
    await write(t, result)
  } catch (err) {
    console.log(err)
  }
}

// export
export default main
export type { Option }
