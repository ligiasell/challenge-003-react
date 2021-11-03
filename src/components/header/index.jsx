import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Logo from '_assets/jungle-devs-logo.svg'

import styles from './styles.css'

const Header = ({ onMainPage, onSignOut }) => (
  <header className={styles.header}>
    <button type="button" aria-label="Main page" className={styles.button} onClick={onMainPage}>
      <svg aria-hidden="true" className={styles.logo}>
        <use xlinkHref={`#${Logo.id}`} />
      </svg>
    </button>
    <button type="button" className={classnames(styles.signout, styles.button)} onClick={onSignOut}>
      Sign Out
    </button>
  </header>
)

Header.propTypes = {
  onMainPage: PropTypes.func,
  onSignOut: PropTypes.func,
}

Header.defaultProps = {
  onMainPage: () => {},
  onSignOut: () => {},
}

export default React.memo(Header)
