import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { subToCollaboration } from '../../actions'
import withAuthorization from '../../component/hoc/withAuthorization'

class CollaborationDetail extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params

    this.watchCollaborationChanges(id)
  }

  watchCollaborationChanges = (id) => {
    this.unsubscribeFromCollaboration = this.props.subToCollaboration(id)
  }

  componentWillUnmount() {
    this.unsubscribeFromCollaboration()
  }

  render() {
    const { collaboration, joinedPeople } = this.props

    return (
      <div className='content-wrapper'>
        <div className='root'>
          <h1 className='title'>{collaboration.title}</h1>
          <div className='body'>
            <div className='viewListUser'>
              <div className='viewWrapItem'>
                <img
                  className='viewAvatarItem'
                  src='https://i.imgur.com/cVDadwb.png'
                  alt='icon avatar'
                />
                <div className='viewWrapContentItem'>
                  <span className='textItem'>
                    Nickname: Vitaliy Shcherbanych
                  </span>
                  <span className='textItem'>online</span>
                </div>
              </div>
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
})

const mapStateToProps = (state) => {
  return {
    collaboration: state.collaboration.joined,
    joinedPeople: state.collaboration.joinedPeople,
  }
}

const Collaboration = withAuthorization(withRouter(CollaborationDetail))

export default connect(mapStateToProps, mapDispatchToProps())(Collaboration)
