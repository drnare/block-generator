import { createContext, useContext, useState, type ReactNode } from 'react'
import { colors } from './colors'

const defaultConfig = {
  columns: 52,
  rows: 27,
  color: colors.find((color) => color.name === 'White'),
  grid: {},
}

type Config = {
  columns: number
  rows: number
  color?: (typeof colors)[0]
  grid: { [key: string]: Config['color'] }
}

type ConfigContext = {
  config: Config
  setConfig: (config: Partial<Config>) => void
  clear: () => void
  generateOutput: () => string
}

const ConfigContext = createContext<ConfigContext>({
  config: defaultConfig,
  setConfig: () => {},
  clear: () => {},
  generateOutput: () => '',
})

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfigState] = useState(defaultConfig)

  const setConfig = (updatedConfig: Partial<Config>) => {
    setConfigState((prevState) => ({
      ...prevState,
      ...updatedConfig,
      grid: { ...prevState.grid, ...updatedConfig.grid },
    }))
  }

  const clear = () =>
    setConfigState((prevState) => ({
      ...prevState,
      grid: {},
    }))

  const generateOutput = () => {
    const output = Array.from(Array(config.rows))
      .map((_, row) =>
        Array.from(Array(config.columns))
          // @ts-expect-error grid key needs some work
          .map((_, column) => config.grid[`${row}_${column}`]?.value || ' ')
          .join('')
      )
      .join('\n')

    return output
  }

  return (
    <ConfigContext value={{ config, setConfig, clear, generateOutput }}>
      {children}
    </ConfigContext>
  )
}

export const useConfig = () => useContext(ConfigContext)
