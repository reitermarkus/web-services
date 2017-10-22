import React, { Component } from 'react';

export default class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {value: ''}
  }

  inputChange = (event) => {
    alert(event.target.value)
    this.setState({value: event.target.value})
  }

  inputSubmit = (event) => {
    alert(event.target.value)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.inputSubmit}>
        <input type="text" placeholder="Ziel suchen ..." value={this.state.value} onChange={this.inputChange}/>
      </form>
    );
  }
}
