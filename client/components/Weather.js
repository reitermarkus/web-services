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

  isNightTime(hour) {
    return hour < this.props.day.start || hour > this.props.day.end
  }

  componentDidMount() {
    const url = `http://api.openweathermap.org/data/2.5/forecast?id=${this.props.id}&units=metric&APPID=${process.env.OPENWEATHERMAP_API_KEY}`
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

        // Calculate average weather for day-time
        const {date, ...rest} = forecast.first

        const averageForecast = forecast.reduce((acc, val) => {
          let hour = parseFloat(val.time.split(':').first)

          if (!this.isNightTime(hour)) {
            const {date, ...rest} = val
            const {updates, day} = this.props

            if (acc[date]) {
              const newObj = {
                [date]: {
                  temp: hour === day.end ? Math.round(((acc[date].temp || 0) + val.temp) / updates) : (acc[date].temp || 0) + val.temp,
                  clouds: hour === day.end ? Math.round(((acc[date].clouds || 0) + val.clouds) / updates) : (acc[date].clouds || 0) + val.clouds,
                  rain: hour === day.end ? Math.round(((acc[date].rain || 0) + val.rain) / updates) : (acc[date].rain || 0) + val.rain,
                  snow: hour === day.end ? Math.round(((acc[date].snow || 0) + val.snow) / updates) : (acc[date].snow || 0) + val.snow,
                  wind: hour === day.end ? Math.round(((acc[date].wind || 0) + val.wind) / updates) : (acc[date].wind || 0) + val.wind,
                  icon: val.icon,
                },
              }

              return {...acc, [date]: {...acc[date], ...newObj[date]}}
            }

            return {...acc, [date]: rest}
          }

          return acc
        }, {[date]: rest})

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
              <div className='temp' data-description='temp'>{f.temp} °C</div>
              <div className='rain' data-description='rain'>{f.rain} mm</div>
              <div className='snow' data-description='snow'>{f.snow} mm</div>
              <div className='wind' data-description='wind'>{f.wind} km/h</div>
              <div className='clouds' data-description='clouds'>{f.clouds} %</div>
            </div>
          )
        }
      </div>
    </div>
}

Weather.propTypes = {
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
  updates: 4,
}
