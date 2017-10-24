import React, { Component } from 'react'

export default class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images : [
        'https://static.pexels.com/photos/414459/pexels-photo-414459.jpeg',
        'https://static.pexels.com/photos/355241/pexels-photo-355241.jpeg',
        'https://static.pexels.com/photos/161039/panorama-roppen-village-mountains-161039.jpeg',
        'https://static.pexels.com/photos/414369/pexels-photo-414369.jpeg',
      ],
      pos : 0,
    }

    this.consts = {
      percent: 100,
      ZERO: 0,
      ONE: 1,
    }
  }

  render() {
    return (
      <div className={'slider'}>
        <div className={'slider-container'}>
          <div className={'img-container'} style={{transform: `translateX(-${this.state.pos * this.consts.percent}%)`}}>
            {this.state.images.map((img, i) => {
              return <div key={i} style={{backgroundImage: `url(${img})`}}></div>
            })}
          </div>
          <div className={'circ-container'}>
            {[...Array(this.state.images.length)].map((x, i) => {
              return <div key={i} onClick={() => { this.setState({pos: i}) }}>{(i) === this.state.pos ? '\u2689' : '\u26ac'}</div>
            })}
          </div>
          <div className={'btn-container'}>
            <div className={'left-btn'} onClick={() =>
            { this.state.pos > this.consts.ZERO ? this.setState(
              (prevState) => ({ pos: prevState.pos - this.consts.ONE })) : null }}>&larr;</div>
            <div className={'right-btn'} onClick={() =>
            { this.state.pos < this.state.images.length - this.consts.ONE ?
              this.setState((prevState) => ({ pos: prevState.pos + this.consts.ONE })) : null }}>&rarr;</div>
          </div>
        </div>
      </div>
    )
  }
}
