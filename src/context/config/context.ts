import { createContext, useContext } from 'react'
import { colors } from '../../colors'
import type { ConfigContextType } from './config.types'

export const defaultConfig = {
  columns: 52,
  rows: 27,
  color: colors.find((color) => color.name === 'White'),
  grid: {},
}

export const ConfigContext = createContext<ConfigContextType>({
  config: defaultConfig,
  setConfig: () => {},
  clear: () => {},
  generateOutput: () => '',
})

export const useConfig = () => useContext(ConfigContext)
