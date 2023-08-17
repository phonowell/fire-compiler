declare module 'coffee-ahk' {
  export type Option = {
    salt?: string
    save?: boolean
  }
  export type Fn = (code: string, option?: Option) => Promise<string>
  export const compile: Fn
}
