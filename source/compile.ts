import {
  asFile as compileCoffeeAsFile,
  Option as OptionCoffee,
} from './compileCoffee'
import { asFile as compilePugAsFile, Option as OptionPug } from './compilePug'
import { asFile as compileStylAsFile } from './compileStyl'
import { asFile as compileTsAsFile, Option as OptionTs } from './compileTs'
import { asFile as compileYamlAsFile } from './compileYaml'

// interface

type Ext = (typeof listExt)[number]

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

const asFile = async <S extends string>(source: S, option?: Option<S>) => {
  if (isSourceExt(source, '.coffee')) {
    await compileCoffeeAsFile(source, '', option)
    return
  }
  if (isSourceExt(source, '.pug')) {
    await compilePugAsFile(source, '', option)
    return
  }
  if (isSourceExt(source, '.styl')) {
    await compileStylAsFile(source, '')
    return
  }
  if (isSourceExt(source, '.ts')) {
    await compileTsAsFile(source, '', option)
    return
  }
  if (isSourceExt(source, '.yaml')) {
    await compileYamlAsFile(source, '')
    return
  }
}

const isSourceExt = <E extends Ext>(
  source: string,
  ext: E,
): source is SourceExt<E> => source.endsWith(ext)

// export
export default asFile
