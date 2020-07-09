import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'
import { onAuthStateChanged, storeAuthUser, resetAuthState } from './actions'
import initStore from './store'
import ServiceApp from './ServiceApp'

const store = initStore()

class App extends React.Component {
  componentDidMount() {
    this.unsubscribeAuth = onAuthStateChanged((authUser) => {
      store.dispatch(resetAuthState())
      store.dispatch(storeAuthUser(authUser))
    })
  }

  componentWillUnmount() {
    this.unsubscribeAuth()
  }

  render() {
    return (
      <Provider store={store}>
        <ToastProvider>
          <Router>
            <ServiceApp />
          </Router>
        </ToastProvider>
      </Provider>
    )
  }
}

export default App
