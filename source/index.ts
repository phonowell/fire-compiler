import compile from './compile'
import {
  asCode as compileCoffeeAsCode,
  asFile as compileCoffeeAsFile,
} from './compileCoffee'
import {
  asCode as compilePugAsCode,
  asFile as compilePugAsFile,
} from './compilePug'
import {
  asCode as compileStylAsCode,
  asFile as compileStylAsFile,
} from './compileStyl'
import {
  asCode as compileTsAsCode,
  asFile as compileTsAsFile,
} from './compileTs'
import { asFile as compileYamlAsFile } from './compileYaml'
const $ = {
  compile,
  compileCoffee: compileCoffeeAsFile,
  compileCoffeeAsCode,
  compileCoffeeAsFile,
  compilePug: compilePugAsFile,
  compilePugAsCode,
  compilePugAsFile,
  compileStyl: compileStylAsFile,
  compileStylAsCode,
  compileStylAsFile,
  compileTs: compileTsAsFile,
  compileTsAsCode,
  compileTsAsFile,
  compileYaml: compileYamlAsFile,
  compileYamlAsFile,
}
export default $

// ---
