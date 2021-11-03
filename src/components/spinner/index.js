import React from 'react'
import { PacmanLoader } from 'react-spinners'

import styles from './styles.css'

const Spinner = () => (
  <div className={styles.spinner}>
    <PacmanLoader size={10} color="#ffb539" />
  </div>
)

export default Spinner
