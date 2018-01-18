import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-icons-kit'
import { arrowLeft } from 'react-icons-kit/fa/arrowLeft'
import { arrowRight } from 'react-icons-kit/fa/arrowRight'
import { circleO } from 'react-icons-kit/fa/circleO'
import { circle } from 'react-icons-kit/fa/circle'

const Circle = (props) => {
  const EMPTY_CIRCLE  = <Icon icon={circleO}/>
  const FILLED_CIRCLE = <Icon icon={circle}/>

  const { filled, ...other } = props

  return <div {...other}>{filled ? FILLED_CIRCLE : EMPTY_CIRCLE}</div>
}

Circle.propTypes = {
  filled: PropTypes.bool,
}

Circle.defaultProps = {
  filled: false,
}

class Slider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pos: 0,
    }
  }

  left = () => {
    if (this.state.pos.positive) {
      this.setState(prevState => ({pos: prevState.pos - 1}))
    }
  }

  right = () => {
    if (this.state.pos < this.props.images.length.decrement) {
      this.setState(prevState => ({pos: prevState.pos + 1}))
    }
  }

  render = () =>
    <div className='slider'>
      <div className='slider-container'>
        <div className='img-container' style={{transform: `translateX(-${this.state.pos}00%)`}}>
          {this.props.images.map((img, i) => <div key={i} style={{backgroundImage: `url(${img})`}}/>)}
        </div>
        <div className='circ-container'>
          {[...Array(this.props.images.length)].map(
            (_, i) => <Circle key={i} onClick={() => this.setState({pos: i})} filled={this.state.pos === i}/>
          )}
        </div>
        <div className='btn-container'>
          <div className='left-btn' onClick={this.left}><Icon icon={arrowLeft}/></div>
          <div className='right-btn' onClick={this.right}><Icon icon={arrowRight}/></div>
        </div>
      </div>
    </div>
}

export default Slider

Slider.propTypes = {
  images: PropTypes.array,
}

Slider.defaultProps = {
  images: [],
}
