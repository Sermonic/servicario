import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getMessages } from '../reducers'
import { markMessageAsRead } from '../actions'

const ReceivedMessages = ({ messages }) => {
  const handleMessageAsRead = (message) => {
    markMessageAsRead(message)
  }

  const renderMessages = (messages) => {
    const filteredMessages = messages
      .filter((m) => !m.isRead)
      .map((message) => (
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
            <button
              onClick={() => handleMessageAsRead(message)}
              className='button is-warning'
            >
              Later
            </button>
          </div>
        </div>
      ))

    if (filteredMessages.length === 0) {
      return <div>No Messages :|</div>
    }

    return filteredMessages
  }

  return renderMessages(messages)
}

const mapStateToProps = (state) => ({ messages: getMessages(state) })

export default connect(mapStateToProps)(ReceivedMessages)
