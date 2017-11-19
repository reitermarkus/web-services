import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LeftArrow from 'react-icons/lib/fa/arrow-left'
import RightArrow from 'react-icons/lib/fa/arrow-right'
import CircleOutlined from 'react-icons/lib/fa/circle-thin'
import CircleFilled from 'react-icons/lib/fa/circle'
import { connect } from 'react-redux'

const Circle = (props) => {
  const EMPTY_CIRCLE  = <CircleOutlined />
  const FILLED_CIRCLE = <CircleFilled />

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
          <div className='left-btn' onClick={this.left}><LeftArrow /></div>
          <div className='right-btn' onClick={this.right}><RightArrow /></div>
        </div>
      </div>
    </div>
}

const mapStateToProps = (store) => {
  return {
    images: store.imageReducer.bgImages,
  }
}

export default connect(mapStateToProps)(Slider)

Slider.propTypes = {
  images: PropTypes.array,
}

Slider.defaultProps = {
  images: [],
}
