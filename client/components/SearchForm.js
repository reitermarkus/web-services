import React, { Component } from 'react'
import axios from 'axios'
import Article from './Article'

export default class SearchForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      output: [],
    }
  }

  handleChange = event => {
    this.value = event.target.value
    if (this.timeout) {
      this.clearTimeout()
      this.timeout = null
    }

    this.timeout = setTimeout(() => {
      this.searchTargets()
    }, 1000)
  }

  clearTimeout = () => {
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.setState({
        timeout: null,
      })
    }
  }

  searchTargets = () => {
    axios.post('/api/location/find', {
      keywords: this.value,
    }).then((res) => {
      this.setState({output: res.data})
    })
  }

  render = () => (
    <fragment>
      <form className='col'>
        <input type='text' className='col-sm-12' placeholder='How should your holidays look like?' onChange={this.handleChange}/>
      </form>
      <div>
        {this.state.output.map((e, i) => {
          return <Article key={i} name={e.name || ''} lat={e.lat || ''} lon={e.lon || ''} weatherid={e.weatherid || ''}/>
        })}
      </div>
    </fragment>
  )
}
