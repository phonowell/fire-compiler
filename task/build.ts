import $ from 'fire-keeper'

// function

const main = async () => {
  await replace()
  await replaceRollup()
}

const pickModule = async (): Promise<string> => {
  const listModule = (await $.glob(['./source/*.ts', '!**/index.ts'])).map(
    $.getBasename
  )

  return [
    ...listModule.map(it => `import ${it} from './${it}'`),
    'const $ = {',
    `  ${listModule.join(', ')},`,
    '}',
    'export default $',
  ].join('\n')
}

const replace = async () => {
  const content = [await pickModule(), '', '// ---']
  const cont = (await $.read<string>('./source/index.ts')).replace(
    /[\s\S]*\/\/\s---/u,
    content.join('\n')
  )
  await $.write('./source/index.ts', cont)
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
