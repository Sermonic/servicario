import React from 'react'
import { fetchUserServices } from '../../actions'
import withAuthorization from '../../component/hoc/withAuthorization'
import ServiceItem from '../../component/service/ServiceItem'

class UserServices extends React.Component {
  componentDidMount() {
    const {
      auth: { user },
      dispatch,
    } = this.props

    dispatch(fetchUserServices(user.uid))
  }

  render() {
    const { services } = this.props.auth.user

    return (
      <div className='container'>
        <div className='content-wrapper'>
          <h1 className='title'>Your Services</h1>
          <div className='columns is-multiline'>
            {services.map((service) => (
              <div key={service.id} className='column'>
                <ServiceItem service={service} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default withAuthorization(UserServices)
