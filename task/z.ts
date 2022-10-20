import $ from 'fire-keeper'
import compiler from '../source'

// variable

const temp = './temp'

// function

const main = async () => {
  await $.remove(temp)
  const listSource = await $.glob(`${temp}/*`)
  for (const source of listSource) {
    await compiler.compile(source, {
      minify: true,
    })
  }
}

// export
export default main
