import React from 'react'
import Sidebar from './component/Sidebar'
import Navbar from './component/Navbar'
import Routes from './Routes'

class ServiceApp extends React.Component {
  renderApplication = () => (
    <React.Fragment>
      <Navbar />
      <Navbar id='navbar-clone' />
      <Sidebar />
      <Routes />
    </React.Fragment>
  )

  render() {
    return this.renderApplication()
  }
}

export default ServiceApp
