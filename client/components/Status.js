import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

const Status = ({ code, children }) =>
  <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.status = code
    }

    return children
  }}/>

Status.propTypes = {
  code: PropTypes.number,
  children: PropTypes.array,
}

export default Status
