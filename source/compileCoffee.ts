import c2a from 'coffee-ahk'
import write from 'fire-keeper/dist/write'

// interface

type Option = {
  salt?: string
}

// function

const main = async (
  source: `${string}.coffee`,
  target = '',
  option: Option = {}
) => {
  try {
    const t = target || source.replace('.coffee', '.ahk')
    const result = await c2a(source, {
      salt: option.salt,
      save: false,
    })
    await write(t, result)
  } catch (err) {
    console.log(err)
  }
}

// export
export default main
export type { Option }
