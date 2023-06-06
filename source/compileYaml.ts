import read from 'fire-keeper/dist/esm/read'
import write from 'fire-keeper/dist/esm/write'

// function

const asFile = async (source: `${string}.yaml`, target = '') => {
  try {
    const t = target || source.replace('.yaml', '.json')
    await write(t, await read(source))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}

// export
export { asFile }
