import React from 'react'
import withAuthorization from '../component/hoc/withAuthorization'

const Secret = (props) => {
  return (
    <div>
      <h1>I'm Secret Page, ONLY Auth USER can see me!</h1>
    </div>
  )
}

export default withAuthorization(Secret)
