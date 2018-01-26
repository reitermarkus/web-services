import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import 'regenerator-runtime/runtime'
import { map, reduce } from 'asyncro'
import PropTypes from 'prop-types'
import { getUserInfo } from '../jwt'

class Recommendation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      recommendations: null,
    }
  }

  componentDidMount() {
    getUserInfo()
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user.favourites && nextProps.user.favourites.length > 0) {
      const fetchLocations = await reduce(nextProps.user.favourites, async(acc, val) =>
        ({...acc, [val]: await axios(`/api/location/find/${encodeURIComponent(val)}`)}), {})

      const fetchPixabay = await reduce(Object.entries(fetchLocations), async(acc, [key, val]) =>
        ({...acc, [key]: await map(val.data, async i => {
          const pixaResult = await axios(`/api/pixabay/find/${encodeURIComponent(i.name)}`) // eslint-disable-line newline-after-var
          return {'locId': i._id, ...pixaResult}
        })}), {})

      const results = await reduce(Object.entries(fetchPixabay), async(acc, [key, val]) => {
        return {...acc, [key]: val.map(res =>
          ({'_id': res.locId, 'image': res.data.hits.filter((v) =>
            (v.webformatWidth / v.webformatHeight) >= 1.0).randomElement.
            webformatURL.replace(/_640\.(\w+)$/, '_960.$1'), name: res.data.query}))}
      }, {})

      this.setState({recommendations: results})
    } else {
      this.setState({recommendations: null})
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
                <h3>Because you are interested in “{recKey}”</h3>
                <div className='preview-cards col'>
                  {recValue.map((e, i) => {
                    return <a key={i} href={`/detail/${e._id}/${e.name}`} className='col-xs-12 col-sm-12 col-md-6 col-lg-4'>
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
