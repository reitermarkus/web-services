import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export default class Weather extends Component {
  constructor(props) {
    super(props)

    this.state = {
      city: {},
      forecast: {},
    }
  }

  isDayTime(hour, props) {
    return hour >= props.day.start && hour <= props.day.end
  }

  componentWillReceiveProps(newProps) {
    this.fetch(newProps)
  }

  componentDidMount() {
    this.fetch(this.props)
  }

  fetch = (props) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?id=${props.id}&units=metric&APPID=${props.apiKey}`
    const factorMPStoKMPH = 3.6

    axios.get(url).then(
      res => {
        // Restructure forecast-data
        let forecast = res.data.list.map(ent => {
          const [date, time] = ent.dt_txt.split(' ')

          return {
            date: Date.parse(date),
            time: time,
            weather: ent.weather.first.description,
            temp: ent.main.temp,
            clouds: ent.clouds.all,
            rain: Object.values(ent.rain || {}).first || 0,
            snow: Object.values(ent.snow || {}).first || 0,
            wind: ent.wind.speed * factorMPStoKMPH,
            id: ent.weather.first.id,
          }
        })

        const dayTimeForecast = forecast
          .filter(f => this.isDayTime(Number(f.time.split(':').first), props))
          .reduce((acc, { date, ...obj }) => (
            {...acc, [date]: [...(acc[date] || []), obj]}
          ), {})

        let averageForecast = Object.entries(dayTimeForecast)
          .reduce((acc, [date, val]) => (
            {...acc, [date]: {
              temp:   val.reduce((acc, { temp })   => acc + temp,   0) / val.length,
              clouds: val.reduce((acc, { clouds }) => acc + clouds, 0) / val.length,
              rain:   val.reduce((acc, { rain })   => acc + rain,   0) / val.length,
              snow:   val.reduce((acc, { snow })   => acc + snow,   0) / val.length,
              wind:   val.reduce((acc, { wind })   => acc + wind,   0) / val.length,
              id:     val.middle.id,
            }}
          ), {})

        this.setState({
          city: {
            id: res.data.city.id,
            name: res.data.city.name,
            country: res.data.city.country,
            lat: res.data.city.coord.lat,
            lon: res.data.city.coord.lon,
          },
          forecast: averageForecast,
        })
      }
    )
  }

  render = () =>
    <div className='weather'>
      <h2>Forecast</h2>
      <div className='weather-items col-xs-12 col no-gap'>
        {
          Object.entries(this.state.forecast).map(([date, f], i) =>
            <div className='weather-item col-xs-12 col-sm-6 col-md-4 col no-gap' key={i}>
              <div className='date col-xs-12'>{WEEKDAYS[new Date(Number(date)).getDay()]}</div>
              <div className='icon col-xs-6'><i className={`owf owf-3x owf-${f.id}`}/></div>
              <div className='temp col-xs-6' data-description='temp'>{Math.round(f.temp)} °C</div>
              <div className='rain col-xs-6' data-description='rain'>{Math.round(f.rain * 10) / 10} mm</div>
              <div className='snow col-xs-6' data-description='snow'>{Math.round(f.snow * 10) / 10} mm</div>
              <div className='wind col-xs-6' data-description='wind'>{Math.round(f.wind)} km/h</div>
              <div className='clouds col-xs-6' data-description='clouds'>{Math.round(f.clouds)} %</div>
            </div>
          )
        }
      </div>
    </div>
}

Weather.propTypes = {
  apiKey: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  day:  PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number,
  }),
}

Weather.defaultProps = {
  day: {
    start: 9,
    end: 18,
  },
}
