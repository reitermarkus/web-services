import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import 'regenerator-runtime/runtime'
import { map, reduce } from 'p-iteration'
import PropTypes from 'prop-types'

class Recommendation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      recommendations: null,
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.user.favourites) {
      const locationPromises = nextProps.user.favourites.map(i => axios(`/api/location/find/${encodeURIComponent(i)}`))
      const resolvedLocationPromises = await Promise.all(locationPromises)
      const locations = nextProps.user.favourites.reduce((acc, val, i) => ({...acc, [val]: resolvedLocationPromises[i].data}), {})

      const pixabayPromises = Object.entries(locations).
        reduce((acc, [key, val]) => ({...acc, [key]: map(val, i => axios(`/api/pixabay/find/${encodeURIComponent(i.name)}`))}), {})

      const results = await reduce(Object.entries(pixabayPromises), async(acc, [key, val]) => {
        const pixaResponse = await val
        const images = pixaResponse.map(res => ({'_id': res.data._id, 'image': res.data.hits.filter((v) =>
          (v.webformatWidth / v.webformatHeight) >= 1.0).randomElement.webformatURL.replace(/_640\.(\w+)$/, '_960.$1'), name: res.data.query}))

        return {...acc, [key]: images}
      }, {})

      this.setState({recommendations: results})
    }
  }

  render = () => {
    return (
      <fragment>
        {this.state.recommendations ?
          <div className='recommendation-wrapper'>
            <h2>Recommendations</h2>
            {Object.entries(this.state.recommendations).map(([recKey, recValue], key) => {
              return <div key={key}>
                <h3>Because you are interessted in {recKey}</h3>
                <div className='preview-cards col'>
                  {recValue.map((e, i) => {
                    return <a key={i} href={'/detail/' + e._id} className='col-xs-12 col-sm-12 col-md-6 col-lg-4'>
                      <div className='img' style={{backgroundImage: `url(${e.image})`}}></div>
                      <div className='txt'>{e.name}</div>
                    </a>
                  })}
                </div>
              </div>
            })}
          </div> : null}
      </fragment>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    user: store.userReducer.user,
  }
}

Recommendation.propTypes = {
  user: PropTypes.object,
}

export default connect(mapStateToProps)(Recommendation)
