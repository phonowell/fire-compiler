import compileCoffee, { Option as OptionCoffee } from './compileCoffee'
import compilePug, { Option as OptionPug } from './compilePug'
import compileStyl from './compileStyl'
import compileTs, { Option as OptionTs } from './compileTs'
import compileYaml from './compileYaml'

// interface

// function

const isCoffee = (source: string): source is `${string}.coffee` =>
  source.endsWith('.coffee')

const isPug = (source: string): source is `${string}.pug` =>
  source.endsWith('.pug')

const isStyl = (source: string): source is `${string}.styl` =>
  source.endsWith('.styl')

const isTs = (source: string): source is `${string}.ts` =>
  source.endsWith('.ts')

const isYaml = (source: string): source is `${string}.yaml` =>
  source.endsWith('.yaml')

const main = async <S extends string>(
  source: S,
  option?: S extends `${string}.coffee`
    ? OptionCoffee
    : S extends `${string}.pug`
    ? OptionPug
    : S extends `${string}.styl`
    ? never
    : S extends `${string}.ts`
    ? OptionTs
    : S extends `${string}.yaml`
    ? never
    : Record<string, unknown>
) => {
  if (isCoffee(source)) {
    await compileCoffee(source, '', option || {})
    return
  }

  if (isPug(source)) {
    await compilePug(source, '', option || {})
    return
  }

  if (isStyl(source)) {
    await compileStyl(source, '')
    return
  }

  if (isTs(source)) {
    await compileTs(source, '', option || {})
    return
  }

  if (isYaml(source)) {
    await compileYaml(source, '')
    return
  }
}

// export
export default main
