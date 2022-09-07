import read from 'fire-keeper/dist/read'
import stylus from 'stylus'
import write from 'fire-keeper/dist/write'

// function

const main = async (source: `${string}.styl`, target = '') => {
  try {
    const content = await read<string>(source)
    const t = target || source.replace('.styl', '.css')
    const result = await new Promise<string>(resolve => {
      stylus.render(content, (_err, css) => resolve(css))
    })
    await write(t, result)
  } catch (err) {
    console.log(err)
  }
}

// export
export default main
