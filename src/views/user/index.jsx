import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, navigate } from '@reach/router'
import classnames from 'classnames'

import { update, getUser, logout } from '_modules/user/actions'
import Header from '_components/header'
import UserPicture from '_assets/user-picture-placeholder@3x.png'
import Spinner from '_components/spinner'

import styles from './styles.css'

class User extends PureComponent {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.number,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      picture: PropTypes.string,
    }).isRequired,
    updateAction: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    loadingPicture: PropTypes.bool,
    getUserAction: PropTypes.func.isRequired,
    userKey: PropTypes.string.isRequired,
    error: PropTypes.string,
    logoutAction: PropTypes.func.isRequired,
  }

  static defaultProps = {
    loading: false,
    loadingPicture: false,
    error: '',
  }

  state = {
    name: '',
  }

  componentDidMount() {
    const { getUserAction } = this.props
    getUserAction()
  }

  onInputChange = event => {
    this.setState({ name: event.target.value })
  }

  handleSubmit = event => {
    const { updateAction } = this.props
    const { name } = this.state
    event.preventDefault()
    updateAction({
      firstName: name
        .split(' ')
        .slice(0, -1)
        .join(' '),
      lastName: name
        .split(' ')
        .slice(-1)
        .join(' '),
    })
  }

  handleMainPage = () => {
    navigate('/')
  }

  handleSignOut = () => {
    const { logoutAction } = this.props
    logoutAction()
  }

  handleSelectedFile = event => {
    const { updateAction } = this.props
    updateAction({
      picture: event.target.files[0],
    })
  }

  render() {
    const { name } = this.state
    const { user, loading, loadingPicture, error, userKey } = this.props

    if (!userKey) {
      return <Redirect to="/login" noThrow />
    }

    return (
      <>
        <Header onMainPage={this.handleMainPage} onSignOut={this.handleSignOut} />
        <form onSubmit={this.handleSubmit}>
          <div className={styles['user-details']}>
            <h1 className={classnames(styles.title, styles.text)}>You’re logged in as:</h1>
            <label htmlFor="file" className={styles['picture-button']}>
              {loadingPicture ? (
                <Spinner />
              ) : (
                <img
                  src={user.picture || UserPicture}
                  alt="User profile"
                  className={styles['user-picture']}
                />
              )}
              <input
                type="file"
                accept="image/*"
                name="picture"
                className={styles['hide-choose-file']}
                onChange={this.handleSelectedFile}
                id="file"
              />
            </label>
            <h2 className={styles.text}>
              {user.firstName} {user.lastName}
            </h2>
            <h2 className={classnames(styles.email, styles.text)}>{user.email}</h2>
            <h2 className={classnames(styles.id, styles.text)}>User ID: {user.id}</h2>
            <h2 className={classnames(styles.description, styles.text)}>Change your name here:</h2>
          </div>
          <div className={styles['new-name']}>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Type your new name here…"
              className={styles.input}
              onChange={this.onInputChange}
            />
            <button type="submit" className={styles['confirm-button']}>
              {loading ? <Spinner /> : 'Change Name'}
            </button>
            {error.length > 0 && <p className={styles['text-error']}>{error}</p>}
          </div>
        </form>
      </>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user,
  loading: user.loading,
  loadingPicture: user.loadingPicture,
  error: user.error,
  userKey: user.key,
})

const mapDispatchToProps = {
  updateAction: update,
  getUserAction: getUser,
  logoutAction: logout,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)
