import c2a from 'coffee-ahk'
import read from 'fire-keeper/dist/read'
import write from 'fire-keeper/dist/write'

// interface

type Option = {
  salt?: string
}

// function

const asCode = (code: string, option: Option = {}) =>
  c2a(code, {
    salt: option.salt,
    save: false,
  })

const asFile = async (
  source: `${string}.coffee`,
  target = '',
  option: Option = {}
) => {
  const code = await read<string>(source)
  if (!code) return

  const t = target || source.replace('.coffee', '.ahk')

  await write(t, await asCode(code, option))
}

// export
export type { Option }
export { asCode, asFile }
