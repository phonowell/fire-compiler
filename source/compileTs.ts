import * as swc from '@swc/core'
import read from 'fire-keeper/dist/read'
import write from 'fire-keeper/dist/write'
import prettier from 'prettier'

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

const asCode = async (code: string, option: Option = {}) => {
  try {
    const result = await swc.transform(code, {
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
    return option.minify
      ? result.code
      : prettier.format(result.code, { parser: 'babel' })
  } catch (err) {
    console.log(err)
    return
  }
}

const asFile = async (
  source: `${string}.ts`,
  target = '',
  option: Option = {},
) => {
  if (source.endsWith('.d.ts')) return

  const content = await read(source)
  if (!content) return

  const t = target || source.replace('.ts', '.js')

  await write(t, await asCode(content, option))
}

// export
export type { Option }
export { asCode, asFile }
