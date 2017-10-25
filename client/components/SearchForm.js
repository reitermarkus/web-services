import React, { Component } from 'react'

export default class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.timeout = null
    this.value = ''
  }

  inputChange = (event) => {
    this.value = event.target.value

    // Reset timeout if one is ongoing
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    // (re)start timeout
    const delay = 1000

    this.timeout = setTimeout(() => {
      this.timeout = null

      if (this.value) {
        this.searchTargets(this.value)
      }
    }, delay)
  }

  searchTargets = (value) => {
    alert(value)
  }

  inputSubmit = (event) => {
    alert(event.target.value)
    event.preventDefault()
  }

  render() {
    return (
      <form className='col' onSubmit={this.inputSubmit}>
        <input type='text' className='col-sm-12' placeholder='How should your holidays look like?' onChange={(e) => { this.inputChange(e) }}/>
      </form>
    )
  }
}
