import { argv, getBasename, glob, move, read, remove, write } from 'fire-keeper'

// function

const main = async () => {
  const step = argv()._[1] as 0 | 1

  if (step === 0) {
    await replaceRollup()
    return
  }

  // step: 1
  await moveType()
}

const moveType = async () => {
  await move('./dist/source/*.d.ts', './dist')
  await move('./dist/esm/source/*.d.ts', './dist/esm')
  await remove([
    './dist/source',
    './dist/task',
    './dist/test',
    './dist/rollup.config.d.ts',
    './dist/esm/source',
    './dist/esm/task',
    './dist/esm/test',
    './dist/esm/rollup.config.d.ts',
  ])
}

const replaceRollup = async () => {
  const listModule = (await glob('./source/*.ts')).map(getBasename)
  const source = './rollup.config.ts'
  const cont = await read(source)
  if (!cont) return
  const content = cont.replace(
    /input: {.*?}/,
    `input: { ${listModule.map(it => `${it}: 'source/${it}.ts'`).join(', ')} }`,
  )
  await write(source, content)
}

// export
export default main
