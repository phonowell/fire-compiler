import read from 'fire-keeper/dist/esm/read'
import write from 'fire-keeper/dist/esm/write'
import pug from 'pug'

// interface

type Option = {
  base?: string
  minify?: boolean
}

// function

const asCode = async (code: string, option: Option = {}) => {
  try {
    return pug.render(code, {
      basedir: option.base,
      pretty: !option.minify,
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    return
  }
}

const asFile = async (source: string, target = '', option: Option = {}) => {
  const code = await read<string>(source)
  if (!code) return

  const t = target || source.replace('.pug', '.html')

  await write(t, await asCode(code, option))
}

// export
export type { Option }
export { asCode, asFile }
