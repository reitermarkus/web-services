import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Trash from 'react-icons/lib/fa/trash'
import Edit from 'react-icons/lib/fa/pencil'

export default class LocationList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: 'list',
      list: [],
    }
  }

  fetchLocationList() {
    fetch('/api/location/list')
      .then(res => res.json())
      .then(res => {
        this.setState({
          list: res,
        })
      })
  }

  componentDidMount() {
    this.fetchLocationList()
  }

  addLocation() {
    this.setState({
      mode: 'add',
    })

    this.props.setMode('add', this.props.emptyData)
  }

  editIndex(i) {
    this.setState({
      mode: 'update',
    })

    this.props.setMode('update', this.state.list[i])
  }

  removeIndex(i) {
    let lst = this.state.list
    let name = lst[i].name

    delete lst[i]

    this.setState({
      list: lst,
    })

    axios.delete(`/api/location/${encodeURIComponent(name)}`)
      .catch(function(error) {
        console.error(error) // eslint-disable-line no-console
      })
  }

  componentWillReceiveProps(props) {
    this.setState({
      mode: props.mode,
    })

    this.fetchLocationList()
  }

  render = () => {
    if (this.state.mode === 'list') {
      return (
        <div className='admin-location-list'>
          {this.state.list.map((e, i) =>
            <div key={i}>
              {Object.entries(e).map(([k, v], i) => {
                if (k.startsWith('_')) {
                  return
                }

                return (
                  <div key={i}>
                    <label>{k}</label>
                    {v.join(', ')}
                  </div>
                )
              })}
              <div className='tools'>
                <Edit className='edit' onClick={() => this.editIndex(i)} />
                <Trash className='trash' onClick={() => this.removeIndex(i)} />
              </div>
            </div>
          )}
          <input type='button' value='add location' onClick={() => this.addLocation()} />
        </div>
      )
    }

    return (<fragment></fragment>)
  }
}

LocationList.propTypes = {
  mode: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  emptyData: PropTypes.object.isRequired,
  setMode: PropTypes.func.isRequired,
}
