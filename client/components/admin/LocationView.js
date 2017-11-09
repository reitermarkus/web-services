import React, { Component } from 'react'
import LocationList from './LocationList'
import LocationForm from './LocationForm'
import '../../style/admin.scss'

export default class LocationView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: 'list',
      data: '',
    }
  }

  setMode(mode, data = {}) {
    this.setState({
      mode: mode,
      data: data,
    })
  }

  componentDidUpdate() {
    if (this.state.mode !== 'edit') {
      return
    }

    let data = this.state.data

    this.refs.form.setState({
      mode: 'update',
      id: data._id,
      name: data.name,
      lat: data.lat,
      lon: data.lon,
      imgs: data.imgs.join('\n'),
      keywords: data.keywords.join('\n'),
    })
  }

  render = () =>
    <fragment>
      {(this.state.mode === 'list') ? <LocationList ref='list' setMode={this.setMode} view={this} /> : <LocationForm ref='form' setMode={this.setMode} view={this} />}
    </fragment>
}
