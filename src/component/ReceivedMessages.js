import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getMessages } from '../reducers'

const ReceivedMessages = ({ dispatch, messages }) => {
  const renderMessages = (messages) => {
    return (
      <div>
        <div className='from-user'>
          <span>From: </span>Admin
        </div>
        <hr />
        <div className='navbar-item navbar-item-messages'>
          <div>Hello Admin, I would like to collaborate with you</div>
          <Link onClick={() => {}} to='/collaborations/someid213213'>
            <div className='button is-success'>Join</div>
          </Link>
          <button onClick={() => {}} className='button is-warning'>
            Later
          </button>
        </div>
      </div>
    )
  }

  return renderMessages(messages)
}

const mapStateToProps = (state) => ({ messages: getMessages(state) })

export default connect(mapStateToProps)(ReceivedMessages)
