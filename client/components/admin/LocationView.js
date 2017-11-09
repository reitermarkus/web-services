import React, { Component } from 'react'
import LocationList from './LocationList'
import LocationForm from './LocationForm'
import '../../style/admin.scss'

export default class LocationView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: 'list',
      data: {},
    }

    this.emptyData = {
      _id: '',
      name: '',
      lat: '',
      lon: '',
      imgs: [],
      keywords: [],
    }
  }

  setMode(mode, data) {
    this.setState({
      mode: mode,
      data: data,
    })
  }

  render = () =>
    <fragment>
      <LocationList mode={this.state.mode} data={this.state.data} emptyData={this.emptyData} setMode={this.setMode.bind(this)} />
      <LocationForm mode={this.state.mode} data={this.state.data} emptyData={this.emptyData} setMode={this.setMode.bind(this)} />
    </fragment>
}
