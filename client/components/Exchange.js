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

export default class Exchange extends Component {
  constructor(props) {
    super(props)

    this.state = {
      base: this.props.base,
      value: this.props.initialValue,
    }

    this.state.from = this.fromState(props)
  }

  availableCurrencies(base) {
    let currencies = CURRENCIES

    delete currencies[base]
    return currencies
  }

  fromState(props) {
    if (props.from && props.from !== props.base) {
      return props.from
    }

    return Object.keys(this.availableCurrencies(props.base)).first
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      base: newProps.base,
      from: this.fromState(newProps),
    })
  }

  componentDidMount() {
    const base = this.props.base

    if (Money.base !== '') {
      return
    }

    axios.get(`/api/fixer/${encodeURIComponent(base)}`).then(
      ({ data }) => {
        this.setState(() => {
          // TODO: Store this in Redux and only fetch it once.
          Money.base = base
          Money.rates = data

          return {}
        })
      }
    )
  }

  currencyFromChanged = event => {
    this.setState({
      from: event.target.value,
    })
  }

  valueFromChanged = event => {
    this.setState({
      value: Number(event.target.value),
    })
  }

  convertValue() {
    try {
      return Money(this.state.value).from(this.state.from).to(this.state.base)
    } catch (e) {
      return NaN
    }
  }

  render = () =>
    <div className='exchange'>
      <h2>Exchange Rate</h2>
      <div className='col'>
        <input type='number' className='col-xs-6 col-md-4' onChange={this.valueFromChanged} defaultValue={this.state.value}/>
        <select className='col-xs-6 col-md-4' onChange={this.currencyFromChanged} defaultValue={this.state.from}>
          {Object.entries(this.availableCurrencies(this.state.base)).map(([sym, name], i) =>
            <option key={i} value={sym}>{name}</option>
          )}
        </select>
        <div className='result col-xs-12 col-md-4'>
          = <b>{numeral(this.convertValue()).format('0,0.00')}</b> {this.state.base}
        </div>
      </div>
    </div>
}

Exchange.propTypes = {
  base: PropTypes.string.isRequired,
  from: PropTypes.string,
  initialValue: PropTypes.number.isRequired,
}

Exchange.defaultProps = {
  base: 'USD',
  initialValue: 100,
}
