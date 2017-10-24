import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pos: 0,
    }
  }

  left = () => {
    if (this.state.pos.positive) {
      this.setState((prevState) => ({ pos: prevState.pos.decrement }))
    }
  }

  right = () => {
    if (this.state.pos < this.props.images.length.decrement) {
      this.setState((prevState) => ({ pos: prevState.pos.increment }))
    }
  }

  render() {
    return (
      <div className={'slider'}>
        <div className={'slider-container'}>
          <div className={'img-container'} style={{transform: `translateX(-${this.state.pos}00%)`}}>
            {this.props.images.map((img, i) => {
              return <div key={i} style={{backgroundImage: `url(${img})`}}></div>
            })}
          </div>
          <div className={'circ-container'}>
            {[...Array(this.props.images.length)].map((x, i) => {
              return <div key={i} onClick={() => { this.setState({pos: i}) }}>{(i) === this.state.pos ? '\u2689' : '\u26ac'}</div>
            })}
          </div>
          <div className={'btn-container'}>
            <div className={'left-btn'} onClick={this.left}>&larr;</div>
            <div className={'right-btn'} onClick={this.right}>&rarr;</div>
          </div>
        </div>
      </div>
    )
  }
}

Slider.propTypes = {
  images: PropTypes.array,
}

Slider.defaultProps = {
  images: [],
}
