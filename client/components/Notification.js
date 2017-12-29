import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Notification extends Component {
  constructor(props) {
    super(props)
  }

  render = () => {
    const status = {
      notification: '#0074D9',
      success: '#27AE60',
      error: '#E74C3C',
    }

    return (
      <fragment>
        {this.props.messages ?
          <div className='message-container'>
            {this.props.messages.map((msg, key) => {
              return <div key={key} style={{backgroundColor: status[this.props.type]}}>{msg}</div>
            })}
          </div> : null}
      </fragment>
    )
  }
}

Notification.defaultProps = {type: 'notification'}

Notification.propTypes = {
  messages: PropTypes.array,
  type: PropTypes.string,
}
