import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Notification extends Component {
  constructor(props) {
    super(props)
  }

  render = () => {
    const status = {
      NOTIFICATION: '#0074D9',
      SUCCESS: '#27AE60',
      ERROR: '#E74C3C',
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

Notification.defaultProps = {type: 'NOTIFICATION'}

const mapStateToProps = (store) => {
  return {
    messages: store.notificationReducer.messages,
    type: store.notificationReducer.type,
  }
}

export default connect(mapStateToProps)(Notification)

Notification.propTypes = {
  messages: PropTypes.array,
  type: PropTypes.string,
}
