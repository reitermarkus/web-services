import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class BackgroundSwitcher extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rndImage: this.getRndNumber(),
    }
  }

  getRndNumber = () => Math.floor(Math.random() * this.props.images.length)

  componentDidMount() {
    setInterval(() => {
      this.setState({
        rndImage: this.getRndNumber(),
      })
    }, this.props.timeout)
  }

  render() {
    const styles = {
      div: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
        display: 'inline-block',
      },
      img: {
        opacity: 0,
        transition: 'opacity 1.5s',
        position: 'fixed',
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      },
    }

    return (
      <div style={styles.div}>
        {this.props.images.map((img, key) => {
          if ((key) === this.state.rndImage) {
            return <div key={key} style={{...styles.img, ...{backgroundImage: `url("${img}")`, opacity: 1}}}/>
          }

          return <div key={key} style={{...styles.img, backgroundImage: `url("${img}")`}}/>
        })}
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    images: store.imageReducer.bgImages,
  }
}

export default connect(mapStateToProps)(BackgroundSwitcher)

BackgroundSwitcher.propTypes = {
  timeout: PropTypes.number.isRequired,
  images: PropTypes.array,
}

BackgroundSwitcher.defaultProps = {
  images: [],
}
