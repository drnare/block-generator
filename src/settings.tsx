import { type ChangeEvent } from 'react'
import { useConfig } from './config'
import { colors } from './colors'
import styles from './settings.module.css'

export const Settings = () => {
  const { config, setConfig, clear, generateOutput } = useConfig()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setConfig({
      [e.target.name]: Number(e.target.value),
    })

  const handleExport = () => navigator.clipboard.writeText(generateOutput())

  return (
    <section className={styles.settings}>
      <header>
        <h1>Settings</h1>
      </header>
      <form>
        <h2>Grid</h2>
        <label>
          Columns
          <input
            type="number"
            name="columns"
            value={config.columns}
            onChange={handleChange}
          />
        </label>
        <label>
          Rows
          <input
            type="number"
            name="rows"
            value={config.rows}
            onChange={handleChange}
          />
        </label>

        <h2>Brick colour</h2>
        <ul>
          {colors.map((color) => (
            <li key={color.name}>
              <button
                type="button"
                onClick={() => setConfig({ color })}
                className={[
                  config.color?.name === color.name
                    ? styles.selected
                    : undefined,
                ].join(' ')}
                style={{
                  background: color.color,
                }}
              >
                {color.value}
              </button>
            </li>
          ))}
        </ul>

        <footer>
          <button type="button" onClick={clear}>
            Clear
          </button>
          <button type="button" onClick={handleExport}>
            Copy Output
          </button>
        </footer>
      </form>
    </section>
  )
}
