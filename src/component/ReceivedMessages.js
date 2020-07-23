import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getMessages } from '../reducers'

const ReceivedMessages = ({ dispatch, messages }) => {
  const renderMessages = (messages) => {
    if (messages.length === 0) {
      return <div>No Messages :|</div>
    }

    return messages.map((message) => (
      <div key={message.id}>
        <div className='from-user'>
          <span>From: </span>
          {message.fromUser.name}
        </div>
        <hr />
        <div className='navbar-item navbar-item-messages'>
          <div>{message.text}</div>
          <Link onClick={() => {}} to={message.cta}>
            <div className='button is-success'>Join</div>
          </Link>
          <button onClick={() => {}} className='button is-warning'>
            Later
          </button>
        </div>
      </div>
    ))
  }

  return renderMessages(messages)
}

const mapStateToProps = (state) => ({ messages: getMessages(state) })

export default connect(mapStateToProps)(ReceivedMessages)
