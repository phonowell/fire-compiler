import { minify } from 'csso'
import read from 'fire-keeper/dist/esm/read'
import write from 'fire-keeper/dist/esm/write'
import stylus from 'stylus'

// interface

type Option = {
  importNib?: boolean
  minify?: boolean
}

// function

const asCode = async (code: string, option: Option = {}) => {
  try {
    const result = await new Promise<string>(resolve => {
      stylus.render(
        option.importNib
          ? ["@import 'node_modules/nib'", code].join('\n')
          : code,
        (_err, css) => resolve(css),
      )
    })
    return option.minify ? minify(result, { comments: false }).css : result
  } catch (err) {
    console.log(err)
    return undefined
  }
}

const asFile = async (source: string, target = '', option: Option = {}) => {
  const code = await read<string>(source)
  if (!code) return

  const t = target || source.replace('.styl', '.css')

  await write(t, await asCode(code, option))
}

// export
export type { Option }
export { asCode, asFile }
