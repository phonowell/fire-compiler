import pug from 'pug'
import read from 'fire-keeper/dist/read'
import write from 'fire-keeper/dist/write'

// interface

type Option = {
  minify?: boolean
}

// function

const asCode = async (code: string, option: Option = {}) => {
  try {
    return pug.render(code, { pretty: !option.minify })
  } catch (err) {
    console.log(err)
    return
  }
}

const asFile = async (
  source: `${string}.pug`,
  target = '',
  option: Option = {}
) => {
  const code = await read<string>(source)
  if (!code) return

  const t = target || source.replace('.pug', '.html')

  await write(t, await asCode(code, option))
}

// export
export type { Option }
export { asCode, asFile }
