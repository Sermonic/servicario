import React from 'react'
import withAuthorization from '../../component/hoc/withAuthorization'

class CollaborationDetail extends React.Component {
  render() {
    return (
      <div className='content-wrapper'>
        <div className='root'>
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

export default withAuthorization(CollaborationDetail)
