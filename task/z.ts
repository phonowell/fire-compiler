import $ from 'fire-keeper'
import compiler from '../source'

// variable

const temp = './temp'

// function

const main = async () => {
  const listSource = await $.glob('./temp/*')
  for (const source of listSource) {
    await compiler.compile(source, {
      minify: true,
    })
  }
}

// export
export default main
