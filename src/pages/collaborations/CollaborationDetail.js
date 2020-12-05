import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import { Timestamp } from '../../db'
import {
  subToCollaboration,
  joinCollaboration,
  leaveCollaboration,
  subToProfile,
  sendChatMessage,
  subToMessages,
  startCollaboration,
} from '../../actions'
import withAuthorization from '../../component/hoc/withAuthorization'
import JoinedPeople from '../../component/collaboration/JoinedPeople'
import ChatMessages from '../../component/collaboration/ChatMessages'
import Timer from '../../component/collaboration/Timer'

class CollaborationDetail extends React.Component {
  state = {
    inputValue: '',
    reload: false,
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const { user } = this.props.auth

    joinCollaboration(id, user.uid)

    this.watchCollaborationChanges(id)
    this.watchMessagesChanges(id)
  }

  watchCollaborationChanges = (id) => {
    this.unsubscribeFromCollaboration = this.props.subToCollaboration(
      id,
      ({ joinedPeople }) => {
        this.watchJoinedPeopleChanges(
          joinedPeople.map((joinedPerson) => joinedPerson.id)
        )
      }
    )
  }

  watchJoinedPeopleChanges = (ids) => {
    this.peopleWatchers = {}

    ids.forEach((id) => {
      this.peopleWatchers[id] = this.props.subToProfile(id)
    })
  }

  watchMessagesChanges = (collaborationId) => {
    this.unsubscribeFromMessages = this.props.subToMessages(collaborationId)
  }

  onKeyboardPress = (e) => {
    if (e.key === 'Enter') {
      this.onSendMessage(this.state.inputValue)
    }
  }

  onSendMessage = (inputValue) => {
    if (inputValue.trim() === '') return

    const timestamp = moment().valueOf().toString()
    const { user } = this.props.auth
    const { collaboration } = this.props

    const message = {
      user: {
        uid: user.uid,
        avatar: user.avatar,
        name: user.fullName,
      },
      timestamp: parseInt(timestamp, 10),
      content: inputValue.trim(),
    }

    this.props
      .sendChatMessage({
        message,
        collaborationId: collaboration.id,
        timestamp,
      })
      .then((_) => this.setState({ inputValue: '' }))
      .catch((error) => alert(error))
  }

  onStartCollaboration = (collaboration) => {
    const { id, time } = collaboration
    const nowSeconds = Timestamp.now().seconds

    const expiresAt = new Timestamp(nowSeconds + time, 0)

    startCollaboration(id, expiresAt)
  }

  getCollaborationStatus = (collaboration) => {
    if (Object.keys(collaboration).length === 0) return 'loading'

    if (!collaboration.expiresAt) return 'notStarted'
    if (Timestamp.now().seconds < collaboration.expiresAt.seconds) {
      return 'active'
    } else {
      return 'finished'
    }
  }

  reloadPage = () => {
    this.setState({ reload: true })
  }

  componentWillUnmount() {
    const { id } = this.props.match.params
    const { user } = this.props.auth

    this.unsubscribeFromCollaboration()
    this.unsubscribeFromMessages()

    // Object.keys(this.peopleWatchers).forEach((uid) =>
    //   this.peopleWatchers[uid]()
    // )

    leaveCollaboration(id, user.uid)
  }

  getCollaborationStatus = (collaboration) => {
    if (Object.keys(collaboration).length === 0) return 'loading'
    if (!collaboration.expiresAt) return 'notStarted'
    if (Timestamp.now().seconds < collaboration.expiresAt.seconds) {
      return 'active'
    } else {
      return 'isFinished'
    }
  }

  render() {
    const { collaboration, joinedPeople, messages } = this.props
    const { user } = this.props.auth
    const { inputValue } = this.state

    const status = this.getCollaborationStatus(collaboration)

    return (
      <div className='content-wrapper'>
        <div className='root'>
          <div className='body'>
            <div className='viewListUser'>
              <JoinedPeople users={joinedPeople} />
            </div>
            <div className='viewBoard'>
              <div className='viewChatBoard'>
                <div className='headerChatBoard'>
                  <div className='headerChatUser'>
                    <img
                      className='viewAvatarItem'
                      src='https://i.imgur.com/cVDadwb.png'
                      alt='icon avatar'
                    />
                    <span className='textHeaderChatBoard'>{user.fullName}</span>
                  </div>
                  {status === ' notStarted' && (
                    <div className='headerChatButton'>
                      <button
                        onClick={() => this.onStartCollaboration(collaboration)}
                        className='button is-success'
                      >
                        Start Collaboration
                      </button>
                    </div>
                  )}
                  {status === 'active' && (
                    <Timer
                      seconds={
                        collaboration.expiresAt.seconds -
                        Timestamp.now().seconds
                      }
                      timeOutCallback={() => this.reloadPage}
                    />
                  )}
                  {status === 'finished' && (
                    <span className='tag is-warning is-large'>
                      Collaboration has been finished
                    </span>
                  )}
                </div>
                <div className='viewListContentChat'>
                  <ChatMessages authUser={user} messages={messages} />
                  <div style={{ float: 'left', clear: 'both' }}></div>
                </div>
                <div className='viewBottom'>
                  <input
                    onChange={(e) =>
                      this.setState({ inputValue: e.target.value })
                    }
                    onKeyPress={this.onKeyboardPress}
                    value={inputValue}
                    className='viewInput'
                    placeholder='Type your message...'
                  />
                  <button
                    onClick={() => this.onSendMessage(inputValue)}
                    className='button is-primary is-large'
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = () => ({
  subToCollaboration,
  subToProfile,
  sendChatMessage,
  subToMessages,
})

const mapStateToProps = ({ collaboration }) => {
  return {
    collaboration: collaboration.joined,
    joinedPeople: collaboration.joinedPeople,
    messages: collaboration.messages,
  }
}

const Collaboration = withAuthorization(withRouter(CollaborationDetail))

export default connect(mapStateToProps, mapDispatchToProps())(Collaboration)
