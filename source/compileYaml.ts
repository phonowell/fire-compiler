import read from 'fire-keeper/dist/read'
import write from 'fire-keeper/dist/write'

// function

const main = async (source: `${string}.yaml`, target = '') => {
  try {
    const t = target || source.replace('.yaml', '.json')
    await write(t, await read(source))
  } catch (err) {
    console.log(err)
  }
}

// export
export default main
