import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import axios from 'axios'
import IPLocation from './IPLocation'
import Article from './Article'

class LocationDetails extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      id: this.props.id,
      data: [],
    }
  }

  componentDidMount() {
    axios.get(`/api/location/get/${encodeURIComponent(this.state.id)}`)
      .then((res) => {
        this.setState({
          data: res.data,
        })
      })
  }

  render = () =>
    <fragment>
      {this.state.data.map((e, i) => {
        return <Article key={i} name={e.name} lat={Number(e.lat)} lon={Number(e.lon)} weatherid={e.weatherid} countrycode={e.countrycode} currency={e.currency}/>
      })}
      <IPLocation/>
    </fragment>
}

export default withRouter(LocationDetails)
