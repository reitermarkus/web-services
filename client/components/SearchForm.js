import React, { Component } from 'react'
import axios from 'axios'
import Article from './Article'

export default class SearchForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      input: '',
      output: [],
      timeout: null,
    }
  }

  handleChange = event => {
    this.setState({
      input: event.target.value,
    })

    this.clearTimeout()

    this.setState({
      timeout: setTimeout(() => {
        this.performSearch()
      }, 1000),
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.clearTimeout()
    this.performSearch()
  }

  clearTimeout = () => {
    if (this.state.timeout) {
      clearTimeout(this.state.timeout)
      this.setState({
        timeout: null,
      })
    }
  }

  performSearch = () => {
    axios.post('/api/location/find', {
      keywords: this.state.input,
    }).then((res) => {
      this.setState({output: res.data})
    })
  }

  render = () => (
    <fragment>
      <form className='col' onSubmit={this.handleSubmit}>
        <input type='text' className='col-sm-12' placeholder='How should your holidays look like?' onChange={this.handleChange}/>
      </form>
      <div>
        {this.state.output.map((e, i) => {
          return <Article key={i} name={e.name} lat={Number(e.lat)} lon={Number(e.lon)} weatherid={e.weatherid}/>
        })}
      </div>
    </fragment>
  )
}
