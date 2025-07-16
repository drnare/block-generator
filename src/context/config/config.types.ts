import type { colors } from '../../colors'

export type Config = {
  columns: number
  rows: number
  color?: (typeof colors)[0]
  grid: { [key: string]: Config['color'] }
}

export type ConfigContextType = {
  config: Config
  setConfig: (config: Partial<Config>) => void
  clear: () => void
  generateOutput: () => string
}
