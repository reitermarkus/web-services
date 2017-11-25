import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import numeral from 'numeral'

const currencies = {
  AUD: 'Australia Dollar (AUD)',
  BGN: 'Bulgaria Lev (BGN)',
  BRL: 'Brazil Real (BRL)',
  CAD: 'Canada Dollar (CAD)',
  CHF: 'Swiss Frank (CHF)',
  CNY: 'China Yuan Renminbi (CNY)',
  CZK: 'Czech Republic Koruna (CZK)',
  DKK: 'Denmark Krone (DKK)',
  EUR: 'Euro (€)',
  GBP: 'United Kingdom Pound (£)',
  HKD: 'Hong Kong Dollar (HKD)',
  HRK: 'Croatia Kuna (HRK)',
  HUF: 'Hungary Forint (HUF)',
  IDR: 'Indonesia Rupiah (IDR)',
  ILS: 'Israel Shekel (ILS)',
  INR: 'India Rupee (INR)',
  JPY: 'Japan Yen (¥)',
  KRW: 'Korea (South) Won (KRW)',
  MXN: 'Mexico Peso (MXN)',
  MYR: 'Malaysia Ringgit (MYR)',
  NOK: 'Norway Krone (NOK)',
  NZD: 'New Zealand Dollar (NZD)',
  PHP: 'Philippines Peso (PHP)',
  PLN: 'Poland Zloty (PLN)',
  RON: 'Romania Leu (RON)',
  RUB: 'Russia Ruble (RUB)',
  SEK: 'Sweden Krona (SEK)',
  SGD: 'Singapore Dollar (SGD)',
  THB: 'Thailand Baht (THB)',
  TRY: 'Turkey Lira (TRY)',
  USD: 'United States Dollar ($)',
  ZAR: 'South Africa Rand (ZAR)',
}

// Using fixer.io API: http://fixer.io/
export default class Exchange extends Component {
  constructor(props) {
    super(props)

    let cs = currencies

    delete cs[this.props.to]

    this.state = {
      from: null,
      to: this.props.to,
      rates: null,
      rate: null,
      value: 1,
      calc: 0,
      currencies: cs,
    }
  }

  componentDidMount() {
    axios.get(`/api/fixer/${encodeURIComponent(this.state.to)}`).then(
      res => {
        this.setState({
          rates: res.data,
        })
      }
    )
  }

  currencyFromChanged = event => {
    const frm = event.target.value
    const val = this.state.value
    const rates = this.state.rates
    const rate = 1 / rates[frm]

    this.setState({
      from: frm,
      rate: rate,
      calc: rate * val,
    })
  }

  valueFromChanged = event => {
    const rate = this.state.rate
    const val = parseFloat(event.target.value) || 0

    this.setState({
      value: val,
      calc: rate * val,
    })
  }

  render = () =>
    <div className='exchange'>
      <h2>Exchange rate</h2>
      <h3>Request exchange-rate for given currency ...</h3>
      <div className='col'>
        <input type='number' className='col-xs-12 col-sm-4' onChange={this.valueFromChanged} defaultValue={this.state.value}/>
        <select className='col-xs-12 col-sm-4' onChange={this.currencyFromChanged}>
          <option value='' selected></option>
          {Object.entries(this.state.currencies).map(([sym, name], i) => {
            return <option key={i} value={sym}>{name}</option>
          })}
        </select>
        <div className='col-xs-12 col-sm-4'>
          = <b className='result'>{numeral(this.state.calc).format('0,0.00')}</b> {this.props.to}
        </div>
      </div>
    </div>
}

Exchange.propTypes = {
  to: PropTypes.string,
}

Exchange.defaultProps = {
  to: 'USD',
}
