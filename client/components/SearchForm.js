import React, { Component } from 'react'

export default class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {value: ''}
  }

  inputChange = (event) => {
    event.preventDefault()

    // Update value in state
    this.setState({value: event.target.value})

    // Reset timeout if one is ongoing
    if (this.state.timeout) {
      clearTimeout(this.state.timeout)
    }

    // (re)start timeout
    let delay = 1000
    let t = setTimeout(function() {
      this.setState({timeout: null})
      this.searchTargets()
    }.bind(this), delay)

    // Store timeout in state
    this.setState({timeout: t})
  }

  searchTargets = () => {
    alert(this.state.value)
  }

  inputSubmit = (event) => {
    alert(event.target.value)
    event.preventDefault()
  }

  render() {
    return (
      <form className={'col'} onSubmit={this.inputSubmit}>
        <input type='text' className={'col-sm-12'} placeholder='How should your holidays look like?' value={this.state.value} onChange={this.inputChange}/>
      </form>
    )
  }
}
