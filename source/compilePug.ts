import pug from 'pug'
import read from 'fire-keeper/dist/read'
import write from 'fire-keeper/dist/write'

// interface

type Option = {
  minify?: boolean
}

// function

const main = async (
  source: `${string}.pug`,
  target = '',
  option: Option = {}
) => {
  try {
    const t = target || source.replace('.pug', '.html')
    const content = await read<string>(source)
    const result = pug.render(content, {
      pretty: !option.minify,
    })
    await write(t, result)
  } catch (err) {
    console.log(err)
  }
}

// export
export default main
export type { Option }
