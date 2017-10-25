import React, { Component } from 'react'

export default class SearchForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timeout: null,
      value: '',
      output: '',
    }
  }

  handleChange = event => {
    this.setState({value: event.target.value})
    this.clearTimeout()

    const triggerDelay = 1000

    this.setState({
      timeout: setTimeout(() => {
        this.clearTimeout()
        this.searchTargets(this.state.value)
      }, triggerDelay),
    })
  }

  clearTimeout = () => {
    if (this.state.timeout) {
      clearTimeout(this.state.timeout)
      this.setState({timeout: null})
    }
  }

  searchTargets = value => {
    this.setState({output: value})
  }

  handleSubmit = event => {
    event.preventDefault()
    this.clearTimeout()
    this.searchTargets(this.state.value)
  }

  render() {
    return [
      <form key={0} className='col' onSubmit={this.handleSubmit}>
        <input type='text' className='col-sm-12' placeholder='How should your holidays look like?' onChange={this.handleChange}/>
      </form>,
      <div key={1}>{this.state.output}</div>,
    ]
  }
}
