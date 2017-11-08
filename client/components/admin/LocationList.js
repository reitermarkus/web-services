import React, { Component } from 'react'
import axios from 'axios'
import Trash from 'react-icons/lib/fa/trash'
import '../../style/admin.scss'

export default class AdminLocationList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      list: [],
    }
  }

  componentDidMount() {
    fetch('/api/location/list')
      .then(res => res.json())
      .then(res => {
        this.setState({
          list: res,
        })
      })
  }

  removeIndex(i) {
    let lst = this.state.list
    let name = lst[i].name

    delete lst[i]

    this.setState({
      list: lst,
    })

    axios.post('/api/location/del', {
      name: name,
    }).catch(function(error) {
      console.error(error) // eslint-disable-line no-console
    })
  }

  render = () =>
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
          <div className='trash' onClick={() => this.removeIndex(i)}>
            <Trash />
          </div>
        </div>
      )}
    </div>
}
