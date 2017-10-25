import React, { Component } from 'react'
import PropTypes from 'prop-types'

const Circle = (props) => {
  const EMPTY_CIRCLE  = '\u26ac'
  const FILLED_CIRCLE = '\u2689'

  const { filled, ...other } = props

  return <div {...other}>{filled ? FILLED_CIRCLE : EMPTY_CIRCLE}</div>
}

Circle.propTypes = {
  filled: PropTypes.bool,
}

Circle.defaultProps = {
  filled: false,
}

export default class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pos: 0,
    }
  }

  left = () => {
    if (this.state.pos.positive) {
      this.setState(prevState => ({pos: prevState.pos.decrement}))
    }
  }

  right = () => {
    if (this.state.pos < this.props.images.length.decrement) {
      this.setState(prevState => ({pos: prevState.pos.increment}))
    }
  }

  render() {
    return (
      <div className={'slider'}>
        <div className={'slider-container'}>
          <div className={'img-container'} style={{transform: `translateX(-${this.state.pos}00%)`}}>
            {this.props.images.map((img, i) => <div key={i} style={{backgroundImage: `url(${img})`}}/>)}
          </div>
          <div className={'circ-container'}>
            {[...Array(this.props.images.length)].map(
              (_, i) => <Circle key={i} onClick={() => this.setState({pos: i})} filled={this.state.pos === i}/>
            )}
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
