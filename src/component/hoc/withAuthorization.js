import React from 'react'

const withAuthorization = (Component) => {
  class WithAuthorization extends React.Component {
    state = {
      secretData: 'Hello World SECRET!',
      secretNumber: 1234567890,
    }

    someSuperFunctionality() {
      alert("I'm super!")
    }

    render() {
      return (
        <Component
          {...this.state}
          someSuperFunctionality={this.someSuperFunctionality}
        />
      )
    }
  }

  return WithAuthorization
}

export default withAuthorization
