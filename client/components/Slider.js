import React, { Component } from 'react'

export default class Slider extends Component {
  constructor(props) {
    super(props)
    this.pos = 0
  }

  prevPicture = (event) => {
    // Check image-limit
    if (this.pos <= 0) {
      return
    }

    // Move slider
    this.pos -= 1
    // Ugly, needs refactor
    let slider = event.target.parentNode.parentNode.parentNode
    let imgContainer = slider.querySelector('.img-container')
    imgContainer.style.transform = 'translateX(-' + this.pos * 100 + '%)'

    // Update slider-circles
    let circles = slider.querySelectorAll('.circ-container > div')
    circles[this.pos + 1].innerHTML = '&#9900;'
    circles[this.pos].innerHTML = '&#9865;'
  }

  nextPicture = (event) => {
    // Ugly, needs refactor
    let slider = event.target.parentNode.parentNode.parentNode
    let imgContainer = slider.querySelector('.img-container')
    let images = imgContainer.querySelectorAll('div')

    // Check image-limit
    if (this.pos >= images.length - 1) {
      return
    }

    // Move slider
    this.pos += 1
    imgContainer.style.transform = 'translateX(-' + this.pos * 100 + '%)'

    // Update circles
    let circles = slider.querySelectorAll('.circ-container > div')
    circles[this.pos - 1].innerHTML = '&#9900;'
    circles[this.pos].innerHTML = '&#9865;'
  }

  render() {
    return (
      <div className={'slider'}>
        <div className={'slider-container'}>
          <div className={'img-container'}>
            <div style={{'background-image': 'url(\'https://static.pexels.com/photos/414459/pexels-photo-414459.jpeg\')'}}></div>
            <div style={{'background-image': 'url(\'https://static.pexels.com/photos/355241/pexels-photo-355241.jpeg\')'}}></div>
            <div style={{'background-image': 'url(\'https://static.pexels.com/photos/161039/panorama-roppen-village-mountains-161039.jpeg\')'}}></div>
            <div style={{'background-image': 'url(\'https://static.pexels.com/photos/414369/pexels-photo-414369.jpeg\')'}}></div>
          </div>
          <div className={'circ-container'}>
            <div>&#9865;</div>
            <div>&#9900;</div>
            <div>&#9900;</div>
            <div>&#9900;</div>
          </div>
          <div className={'btn-container'}>
            <div className={'left-btn'} onClick={(e) => { this.prevPicture(e) }}>&larr;</div>
            <div className={'right-btn'} onClick={(e) => { this.nextPicture(e) }}>&rarr;</div>
          </div>
        </div>
      </div>
    )
  }
}
