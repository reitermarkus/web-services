import React, { Component } from 'react'
import axios from 'axios'
import Article from './Article'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

class SearchForm extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      input: props.query || '',
      output: [],
      timeout: null,
    }
  }

  componentDidMount() {
    if (this.state.input != '') {
      this.performSearch()
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
    axios.get(`/api/location/find/${encodeURIComponent(this.state.input)}`)
      .then((res) => {
        const url = `/search/${encodeURIComponent(this.state.input)}`

        if (this.props.location != url) {
          this.props.history.push(url)
        }

        this.setState({output: res.data})
      })
  }

  render = () => (
    <fragment>
      <form className='col' onSubmit={this.handleSubmit}>
        <input type='text' className='col-sm-12' placeholder='How should your holidays look like?' onChange={this.handleChange} defaultValue={this.state.input}/>
      </form>
      <div>
        {this.state.output.map((e, i) => {
          return <Article key={i} name={e.name} lat={Number(e.lat)} lon={Number(e.lon)} weatherid={e.weatherid}/>
        })}
      </div>
    </fragment>
  )
}

export default withRouter(SearchForm)
