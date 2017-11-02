import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

// using fixer.io API: http://fixer.io/
export default class Exchange extends Component {
  constructor(props) {
    super(props)

    let currencyFrom = this.props.from
    let currencyTo = this.props.to
    let url = `https://api.fixer.io/latest?base=${currencyFrom}&symbols=${currencyTo}`

    axios.get(url).then(
      res => {
        this.setState({
          from: currencyFrom,
          to: currencyTo,
          rate: res.data.rates[currencyTo],
        })
      }
    )
  }

  currencyFromChanged = (event) => {
    let currencyFrom = event.target.value
    let currencyTo = this.state.to
    let url = `https://api.fixer.io/latest?base=${currencyFrom}&symbols=${currencyTo}`

    axios.get(url).then(
      res => {
        this.setState({
          from: currencyFrom,
          to: currencyTo,
          rate: res.data.rates[currencyTo],
        })
      }
    )
  }

  render = () =>
    <div className='exchange'>
      <h2>Exchange rate</h2>
      1&nbsp;
      <select onChange={this.currencyFromChanged} defaultValue={this.props.from}>
        <option value='AUD'>Australia Dollar (AUD)</option>
        <option value='BGN'>Bulgaria Lev (BGN)</option>
        <option value='BRL'>Brazil Real (BRL)</option>
        <option value='CAD'>Canada Dollar (CAD)</option>
        <option value='CHF'>Swiss Frank (CHF)</option>
        <option value='CNY'>China Yuan Renminbi (CNY)</option>
        <option value='CZK'>Czech Republic Koruna (CZK)</option>
        <option value='DKK'>Denmark Krone (DKK)</option>
        <option value='EUR'>Euro (€)</option>
        <option value='GBP'>United Kingdom Pound (£)</option>
        <option value='HKD'>Hong Kong Dollar (HKD)</option>
        <option value='HRK'>Croatia Kuna (HRK)</option>
        <option value='HUF'>Hungary Forint (HUF)</option>
        <option value='IDR'>Indonesia Rupiah (IDR)</option>
        <option value='ILS'>Israel Shekel (ILS)</option>
        <option value='INR'>India Rupee (INR)</option>
        <option value='JPY'>Japan Yen (¥)</option>
        <option value='KRW'>Korea (South) Won (KRW)</option>
        <option value='MXN'>Mexico Peso (MXN)</option>
        <option value='MYR'>Malaysia Ringgit (MYR)</option>
        <option value='NOK'>Norway Krone (NOK)</option>
        <option value='NZD'>New Zealand Dollar (NZD)</option>
        <option value='PHP'>Philippines Peso (PHP)</option>
        <option value='PLN'>Poland Zloty (PLN)</option>
        <option value='RON'>Romania Leu (RON)</option>
        <option value='RUB'>Russia Ruble (RUB)</option>
        <option value='SEK'>Sweden Krona (SEK)</option>
        <option value='SGD'>Singapore Dollar (SGD)</option>
        <option value='THB'>Thailand Baht (THB)</option>
        <option value='TRY'>Turkey Lira (TRY)</option>
        <option value='USD'>United States Dollar ($)</option>
        <option value='ZAR'>South Africa Rand (ZAR)</option>
      </select>
      &nbsp;=&nbsp;
      <span className='result'>{(this.state || {}).rate}</span>
      &nbsp;{this.props.to}
    </div>
}

Exchange.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
}

Exchange.defaultProps = {
  from: 'EUR',
  to: 'USD',
}
