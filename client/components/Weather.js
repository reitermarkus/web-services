import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const WeatherIcon = ({ id, forceDay }) => {
  const iconName = forceDay ? id.replace(/n$/, 'd') : id

  return <img src={`http://openweathermap.org/img/w/${iconName}.png`}/>
}

WeatherIcon.propTypes = {
  id: PropTypes.string,
  forceDay: PropTypes.bool,
}

export default class Weather extends Component {
  constructor(props) {
    super(props)

    this.state = {
      city: {},
      forecast: {},
    }
  }

  isDayTime(hour) {
    return hour >= this.props.day.start && hour <= this.props.day.end
  }

  componentDidMount() {
    const url = `http://api.openweathermap.org/data/2.5/forecast?id=${this.props.id}&units=metric&APPID=${this.props.apiKey}`
    const factorMPStoKMPH = 3.6

    axios.get(url).then(
      res => {
        // Restructure forecast-data
        let forecast = res.data.list.map(ent => {
          const [date, time] = ent.dt_txt.split(' ')

          return {
            date: date,
            time: time,
            weather: ent.weather.first.description,
            temp: ent.main.temp,
            clouds: ent.clouds.all,
            rain: Object.values(ent.rain || {}).first || 0,
            snow: Object.values(ent.snow || {}).first || 0,
            wind: ent.wind.speed * factorMPStoKMPH,
            icon: ent.weather.first.icon,
          }
        })

        const dayTimeForecast = forecast
          .filter(f => this.isDayTime(Number(f.time.split(':').first)))
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
              icon:   val.middle.icon,
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
      <div className='title'>Weather at <b>{this.state.city.name}</b> ({this.state.city.country})</div>
      <div className='grid'>
        {
          Object.entries(this.state.forecast).map(([date, f], i) =>
            <div className='weather-item' key={i}>
              <div className='date'>{date}</div>
              <div className='icon'><WeatherIcon id={f.icon} forceDay/></div>
              <div className='temp' data-description='temp'>{Math.round(f.temp)} °C</div>
              <div className='rain' data-description='rain'>{Math.round(f.rain)} mm</div>
              <div className='snow' data-description='snow'>{Math.round(f.snow)} mm</div>
              <div className='wind' data-description='wind'>{Math.round(f.wind)} km/h</div>
              <div className='clouds' data-description='clouds'>{Math.round(f.clouds)} %</div>
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
