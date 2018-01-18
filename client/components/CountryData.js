import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class CountryData extends Component {
  constructor(props) {
    super(props)

    this.state = {
      call: '',
      capital: '',
      currs: '',
      flag: '',
      langs: '',
      region: '',
      subregion: '',
      timezone: '',
    }
  }

  fetch() {
    let url = `https://restcountries.eu/rest/v2/alpha/${this.props.code}`
    const opts = {}

    axios.post('/api/curl', {url: url, opts: opts})
      .then(res => res.data)
      .then(res => {
        this.setState({
          call: '+' + res.callingCodes.join(', '),
          capital: res.capital,
          currs: res.currencies.map(e => {
            return e.name + ' (' + e.symbol + ')'
          }).join(', '),
          flag: res.flag,
          langs: res.languages.map(l => {
            return l.name
          }).join(', '),
          name: res.name,
          region: res.region,
          subregion: res.subregion,
          timezone: res.timezones.join(', '),
        })
      })
  }

  componentDidMount() {
    this.fetch()
  }

  render = () =>
    <div className='country-data'>
      <div className='col'>
        <div className='col-sm-4'>
          <h2>Region</h2>
          <span>{this.state.region} ({this.state.subregion})</span>
        </div>
        <div className='col-sm-4'>
          <h2>Country</h2>
          <span>{this.state.name} </span><img src={this.state.flag}/>
        </div>
        <div className='col-sm-4'>
          <h2>Capital</h2>
          <span>{this.state.capital}</span>
        </div>
        <div className='col-sm-4'>
          <h2>Timezone</h2>
          <span>{this.state.timezone}</span>
        </div>
        <div className='col-sm-4'>
          <h2>Language</h2>
          <span>{this.state.langs}</span>
        </div>
        <div className='col-sm-4'>
          <h2>Currency</h2>
          <span>{this.state.currs}</span>
        </div>
      </div>
    </div>
}

CountryData.propTypes = {
  code: PropTypes.string.isRequired,
}
