import React from 'react'
import { connect } from 'react-redux'
import { withToastManager } from 'react-toast-notifications'
import { newCollaboration, createMessage } from '../../helpers/offers'
import { fetchSentOffers, collaborate } from '../../actions'
import withAuthorization from '../../component/hoc/withAuthorization'
import ServiceItem from '../../component/service/ServiceItem'

class SentOffers extends React.Component {
  componentDidMount() {
    const { auth } = this.props

    this.props.dispatch(fetchSentOffers(auth.user.uid))
  }

  createCollaboration = (offer) => {
    const {
      auth: { user },
      toastManager,
    } = this.props

    const collaboration = newCollaboration({ offer, fromUser: user })
    const message = createMessage({ offer, fromUser: user })

    this.props.collaborate({ collaboration, message }).then((_) =>
      toastManager.add('Collaboration was Created!', {
        appearance: 'success',
        autoDismiss: true,
      })
    )
  }

  render() {
    const { offers } = this.props

    return (
      <div className='container'>
        <div className='content-wrapper'>
          <h1 className='title'>Sent Offers</h1>
          <div className='columns'>
            {offers.map((offer) => (
              <div key={offer.id} className='column is-one-third'>
                <ServiceItem
                  noButton
                  className='offer-card'
                  service={offer.service}
                >
                  <div className='tag is-large'>{offer.status}</div>
                  <hr />
                  <div className='service-offer'>
                    <div>
                      <span className='label'>To User:</span>{' '}
                      {offer.toUser.fullName}
                    </div>
                    <div>
                      <span className='label'>Note:</span> {offer.note}
                    </div>
                    <div>
                      <span className='label'>Price:</span> ${offer.price}
                    </div>
                    <div>
                      <span className='label'>Time:</span> {offer.time} hours
                    </div>
                  </div>
                  {offer.status === 'accepted' && !offer.collaborationCreated && (
                    <div>
                      <hr />
                      <button
                        onClick={() => this.createCollaboration(offer)}
                        className='button is-success'
                      >
                        Collaborate
                      </button>
                    </div>
                  )}
                </ServiceItem>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ offers }) => ({ offers: offers.sent })

const SentOfferWithToast = withToastManager(SentOffers)

export default withAuthorization(
  connect(mapStateToProps, { collaborate })(SentOfferWithToast)
)