import { useState, type ReactNode } from 'react'
import { ConfigContext, defaultConfig } from './context'
import type { Config } from './config.types'

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

  const generateOutput = () =>
    Array.from(Array(config.rows))
      .map((_, row) =>
        Array.from(Array(config.columns))
          // @ts-expect-error grid key needs some work
          .map((_, column) => config.grid[`${row}_${column}`]?.value || '0')
          .join('')
      )
      .join('\n')

  return (
    <ConfigContext value={{ config, setConfig, clear, generateOutput }}>
      {children}
    </ConfigContext>
  )
}
