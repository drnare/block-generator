import { useConfig } from './config'
import styles from './grid.module.css'

export const Grid = () => {
  const { config, setConfig } = useConfig()

  const handleGridCellClick = ({
    column,
    row,
  }: {
    column: number
    row: number
  }) => {
    const key = `${row}_${column}`
    setConfig({ grid: { [key]: config.grid[key] ? undefined : config.color } })
  }

  return (
    <div
      className={styles.grid}
      style={{
        gridTemplateColumns: `repeat(${config.columns}, auto)`,
        gridTemplateRows: `repeat(${config.rows}, auto)`,
      }}
    >
      {Array.from(Array(config.rows)).map((_, row) =>
        Array.from(Array(config.columns)).map((_, column) => (
          <div key={`${row}_${column}`}>
            <button
              onClick={() => handleGridCellClick({ column, row })}
              aria-label={`Row ${row}, Column ${column}`}
              style={{
                background: config.grid[`${row}_${column}`]?.color,
              }}
            >
              {' '}
            </button>
          </div>
        ))
      )}
    </div>
  )
}
