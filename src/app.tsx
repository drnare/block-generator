import { ConfigProvider } from './config'
import { Grid } from './grid'
import { Settings } from './settings'
import styles from './app.module.css'

export const App = () => (
  <ConfigProvider>
    <div className={styles.app}>
      <Grid />
      <Settings />
    </div>
  </ConfigProvider>
)
