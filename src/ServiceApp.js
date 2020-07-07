import React from 'react'
import { connect } from 'react-redux'
import Sidebar from './component/Sidebar'
import Navbar from './component/Navbar'
import Spinner from './component/Spinner'
import Routes from './Routes'

class ServiceApp extends React.Component {
  renderApplication = (auth) => (
    <React.Fragment>
      <Navbar auth={auth} />
      <Navbar auth={auth} id='navbar-clone' />
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

export default connect(mapStateToProps)(ServiceApp)
