import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  subToCollaboration,
  joinCollaboration,
  subToProfile,
} from '../../actions'
import withAuthorization from '../../component/hoc/withAuthorization'
import JoinedPeople from '../../component/collaboration/JoinedPeople'

class CollaborationDetail extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params
    const { user } = this.props.auth

    joinCollaboration(id, user.uid)

    this.watchCollaborationChanges(id)
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

  componentWillUnmount() {
    this.unsubscribeFromCollaboration()

    Object.keys(this.peopleWatchers).forEach((uid) =>
      this.peopleWatchers[uid]()
    )
  }

  render() {
    const { collaboration, joinedPeople } = this.props

    return (
      <div className='content-wrapper'>
        <div className='root'>
          <h1 className='title'>{collaboration.title}</h1>
          <div className='body'>
            <div className='viewListUser'>
              <JoinedPeople users={joinedPeople} />
            </div>
            <div className='viewBoard'>
              <div className='viewChatBoard'>
                <div className='headerChatBoard'>
                  <img
                    className='viewAvatarItem'
                    src='https://i.imgur.com/cVDadwb.png'
                    alt='icon avatar'
                  />
                  <span className='textHeaderChatBoard'>
                    Vitaliy Shcherbanych
                  </span>
                </div>
                <div className='viewListContentChat'>
                  <div className='viewWrapItemLeft'>
                    <div className='viewWrapItemLeft3'>
                      <img
                        src='https://i.imgur.com/cVDadwb.png'
                        alt='avatar'
                        className='peerAvatarLeft'
                      />
                      <div className='viewItemLeft'>
                        <span className='textContentItem'>hey</span>
                      </div>
                    </div>
                    <span className='textTimeLeft'>Jun 27, 2020</span>
                  </div>
                  <div className='viewItemRight'>
                    <span className='textContentItem'>hey</span>
                  </div>
                  <div style={{ float: 'left', clear: 'both' }}></div>
                </div>
                <div className='viewBottom'>
                  <input
                    onChange={() => {}}
                    className='viewInput'
                    placeholder='Type your message...'
                  />
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
})

const mapStateToProps = (state) => {
  return {
    collaboration: state.collaboration.joined,
    joinedPeople: state.collaboration.joinedPeople,
  }
}

const Collaboration = withAuthorization(withRouter(CollaborationDetail))

export default connect(mapStateToProps, mapDispatchToProps())(Collaboration)
