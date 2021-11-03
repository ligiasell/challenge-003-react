import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import styles from './styles.css'

const Input = ({ onChange, className, type, placeholder, name, value, textError }) => {
  return (
    <div className={styles['input-container']}>
      <input
        onChange={onChange}
        className={classnames(className, styles.input)}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
      />
      {textError.length > 0 && <p className={styles['text-error']}>{textError}</p>}
    </div>
  )
}

Input.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  textError: PropTypes.string,
}

Input.defaultProps = {
  onChange: () => {},
  className: '',
  type: 'text',
  placeholder: '',
  name: '',
  value: '',
  textError: '',
}

export default Input
