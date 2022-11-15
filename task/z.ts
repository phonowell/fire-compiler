import $ from 'fire-keeper'
import compiler from '../source'

// variable

const temp = './temp'

// function

const main = async () => {
  const code = await $.read('./temp/z.styl')
  if (!code) return
  console.log(await compiler.compileStylAsCode(code))
}

// export
export default main
