import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, navigate } from '@reach/router'

import Input from '_components/input'
import Logo from '_assets/jungle-devs-logo.svg'
import { login } from '_modules/user/actions'
import Spinner from '_components/spinner'

import styles from './styles.css'

class Login extends PureComponent {
  static propTypes = {
    loginAction: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.string,
    userKey: PropTypes.string.isRequired,
  }

  static defaultProps = {
    loading: false,
    error: '',
  }

  state = {
    email: '',
    password: '',
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading && !this.props.loading && this.props.error.length === 0) {
      navigate('/')
    }
  }

  handleSubmit = event => {
    const { loginAction } = this.props
    event.preventDefault()
    loginAction({
      email: this.state.email,
      password: this.state.password,
    })
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { email, password } = this.state
    const { loading, error, userKey } = this.props

    if (userKey) {
      return <Redirect to="/" noThrow />
    }

    return (
      <div className={styles.login}>
        <form className={styles.container} onSubmit={this.handleSubmit}>
          <svg aria-hidden="true" className={styles.logo}>
            <use xlinkHref={`#${Logo.id}`} />
          </svg>
          <Input
            onChange={this.handleChange}
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            className={styles.email}
          />
          <Input
            onChange={this.handleChange}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            textError={error}
            className={styles.password}
          />
          <button type="submit" className={styles['login-button']}>
            {loading ? <Spinner /> : 'Login'}
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  loading: user.loading,
  error: user.error,
  userKey: user.key,
})

const mapDispatchToProps = {
  loginAction: login,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
