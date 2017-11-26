import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import numeral from 'numeral'
import Money from 'money'

const CURRENCIES = {
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

    this.state = {
      from: this.props.from,
      value: 1,
      rates: {},
    }

    this.state.to = this.props.to || Object.keys(this.availableCurrencies()).first
  }

  availableCurrencies() {
    let currencies = CURRENCIES

    delete currencies[this.state.from]
    return currencies
  }

  componentDidMount() {
    axios.get(`/api/fixer/${encodeURIComponent(this.state.from)}`).then(
      res => {
        this.setState({
          rates: res.data,
        })
      }
    )
  }

  currencyToChanged = event => {
    this.setState({
      to: event.target.value,
    })
  }

  valueFromChanged = event => {
    this.setState({
      value: Number(event.target.value),
    })
  }

  convertValue = (value) => {
    Money.base = this.state.from
    Money.rates = this.state.rates

    try {
      return Money(value).from(this.state.from).to(this.state.to)
    } catch (e) {
      return 1.0
    }
  }

  render = () =>
    <div className='exchange'>
      <h2>Exchange rate</h2>
      <h3>Request exchange-rate for given currency ...</h3>
      <div className='col'>
        <input type='number' className='col-xs-12 col-sm-4' onChange={this.valueFromChanged} defaultValue={this.state.value}/>
        <select className='col-xs-12 col-sm-4' onChange={this.currencyToChanged} defaultValue={this.state.to}>
          {Object.entries(this.availableCurrencies()).map(([sym, name], i) =>
            <option key={i} value={sym}>{name}</option>
          )}
        </select>
        <div className='col-xs-12 col-sm-4'>
          = <b className='result'>{numeral(this.convertValue(this.state.value)).format('0,0.00')}</b> {this.state.from}
        </div>
      </div>
    </div>
}

Exchange.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string,
}

Exchange.defaultProps = {
  from: 'USD',
}
