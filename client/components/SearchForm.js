import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

class SearchForm extends Component {
  static propTypes = {
    query: PropTypes.string,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      input: decodeURIComponent((props.match.params.query || '').replace(/\+/g, '%20')),
      output: [],
      timeout: null,
    }
  }

  componentDidMount() {
    if (this.state.input !== '') {
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
    const query = encodeURIComponent(this.state.input.trim())

    axios.get(`/api/location/find/${query}`)
      .then((res) => {
        const url = `/search/${query.replace(/%20/g, '+')}`

        if (this.props.location !== url) {
          this.props.history.push(url)
        }

        res.data.map((e, i) => {
          axios.get(`/api/pixabay/find/${encodeURIComponent(e.name)}`)
            .then(res => res.data)
            .then(res => {
              let o = this.state.output

              o[i].image = res.hits.filter((v) => (v.webformatWidth / v.webformatHeight) >= 1.0).randomIndex.webformatURL.replace(/_640\.(\w+)$/, '_960.$1')
              this.setState({
                output: o,
              })
            })
          return e
        })

        this.setState({output: res.data})
      })
  }

  render = () => (
    <fragment>
      <form className='col' onSubmit={this.handleSubmit}>
        <input type='text' className='col-sm-12' placeholder='How should your holidays look like?' onChange={this.handleChange} defaultValue={this.state.input}/>
      </form>
      <div className='preview-cards col'>
        {this.state.output.map((e, i) => {
          return <a key={i} href={'/detail/' + e._id} className='col-xs-12 col-sm-12 col-md-6 col-lg-4'>
            <div className='img' style={{backgroundImage: `url(${e.image})`}}></div>
            <div className='txt'>{e.name}</div>
          </a>
        })}
      </div>
    </fragment>
  )
}

export default withRouter(SearchForm)
