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
        let averageForecast = {}

        forecast.forEach((e) => {
          let hour = parseFloat(e.time.split(':').first)

          if (this.isNightTime(hour)) {
            return
          }

          if (!averageForecast[e.date]) {
            averageForecast[e.date] = {}
          }

          let f = averageForecast[e.date]

          if (!f.weather) {
            f.weather = []
          }
          f.weather.push(e.weather)

          f.temp = (f.temp || 0) + e.temp
          f.clouds = (f.clouds || 0) + e.clouds
          f.rain = (f.rain || 0) + e.rain
          f.snow = (f.snow || 0) + e.snow
          f.wind = (f.wind || 0) + e.wind
          f.count = (f.count || 0) + 1
          f.icon = e.icon
        })

        Object.values(averageForecast).forEach((f) => {
          let cnt = f.count

          delete f.count

          f.weather = f.weather[Math.floor(f.weather.length / 2)]

          Object.entries(f).forEach(([k, e]) => {
            if (!isNaN(e)) {
              f[k] = Math.round(e / cnt)
            }
          })
        })

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
    start: 8,
    end: 18,
  },
}
