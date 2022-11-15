import csso from 'csso'
import read from 'fire-keeper/dist/read'
import stylus from 'stylus'
import write from 'fire-keeper/dist/write'

// interface

type Option = {
  minify?: boolean
}

// function

const asCode = async (code: string, option: Option = {}) => {
  try {
    const result = await new Promise<string>(resolve => {
      stylus.render(code, (_err, css) => resolve(css))
    })
    return option.minify ? csso.minify(result, { comments: false }).css : result
  } catch (err) {
    console.log(err)
    return
  }
}

const asFile = async (
  source: `${string}.styl`,
  target = '',
  option: Option = {}
) => {
  const code = await read<string>(source)
  if (!code) return

  const t = target || source.replace('.styl', '.css')

  await write(t, await asCode(code, option))
}

// export
export type { Option }
export { asCode, asFile }
