import React from 'react'
import withAuthorization from '../component/hoc/withAuthorization'

const Faq = () => {
  return <h1>Faq Page</h1>
}

export default withAuthorization(Faq)
