import React from 'react'
import { connect } from 'react-redux'
import Sidebar from './component/Sidebar'
import Navbar from './component/Navbar'
import Spinner from './component/Spinner'
import Routes from './Routes'
import { logout } from './actions'

class ServiceApp extends React.Component {
  handleLogout = (uid) => this.props.logout(uid)

  renderApplication = (auth) => (
    <React.Fragment>
      <Navbar
        loadFresh
        auth={auth}
        logout={() => this.handleLogout(auth.user.uid)}
        id='navbar-main'
      />
      <Navbar
        auth={auth}
        logout={() => this.handleLogout(auth.user.uid)}
        id='navbar-clone'
      />
      <Sidebar />
      <Routes />
    </React.Fragment>
  )

  render() {
    const { auth } = this.props

    return auth.isAuthResolved ? this.renderApplication(auth) : <Spinner />
  }
}

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, { logout })(ServiceApp)
