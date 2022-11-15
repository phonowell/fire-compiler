import $ from 'fire-keeper'

// function

const main = async () => {
  await replaceRollup()
}

const replaceRollup = async () => {
  const listModule = (await $.glob('./source/*.ts')).map($.getBasename)
  const source = './rollup.config.js'
  const cont = await $.read(source)
  if (!cont) return
  const content = cont.replace(
    /input: {.*?}/,
    `input: { ${listModule.map(it => `${it}: 'source/${it}.ts'`).join(', ')} }`
  )
  await $.write(source, content)
}

// export
export default main
