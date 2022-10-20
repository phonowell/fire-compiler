import compileCoffee, { Option as OptionCoffee } from './compileCoffee'
import compilePug, { Option as OptionPug } from './compilePug'
import compileStyl from './compileStyl'
import compileTs, { Option as OptionTs } from './compileTs'
import compileYaml from './compileYaml'

// interface

type Ext = typeof listExt[number]

type Option<S> = S extends SourceExt<'.coffee'>
  ? OptionCoffee
  : S extends SourceExt<'.pug'>
  ? OptionPug
  : S extends SourceExt<'.styl'>
  ? never
  : S extends SourceExt<'.ts'>
  ? OptionTs
  : S extends SourceExt<'.yaml'>
  ? never
  : Record<string, unknown>

type SourceExt<E extends Ext> = `${string}${E}`

// varialbe

const listExt = ['.coffee', '.pug', '.styl', '.ts', '.yaml'] as const

// function

const isSourceExt = <E extends Ext>(
  source: string,
  ext: E
): source is SourceExt<E> => source.endsWith(ext)

const main = async <S extends string>(source: S, option?: Option<S>) => {
  if (isSourceExt(source, '.coffee')) {
    await compileCoffee(source, '', option)
    return
  }
  if (isSourceExt(source, '.pug')) {
    await compilePug(source, '', option)
    return
  }
  if (isSourceExt(source, '.styl')) {
    await compileStyl(source, '')
    return
  }
  if (isSourceExt(source, '.ts')) {
    await compileTs(source, '', option)
    return
  }
  if (isSourceExt(source, '.yaml')) {
    await compileYaml(source, '')
    return
  }
}

// export
export default main
