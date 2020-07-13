import React from 'react'
import withAuthorization from '../../component/hoc/withAuthorization'
import { fetchUserServices } from '../../actions'

class UserServices extends React.Component {
  componentDidMount() {
    const {
      auth: { user },
    } = this.props

    fetchUserServices(user.uid).then((services) => {
      alert(JSON.stringify(services))
    })
  }

  render() {
    return (
      <div className='container'>
        <div className='content-wrapper'>
          <div className='columns'>I'm User Services Page!</div>
        </div>
      </div>
    )
  }
}

export default withAuthorization(UserServices)
