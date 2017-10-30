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
      id: props.id,
      city: {},
      forecast: {},
    }
  }

  // Check if given hour is at night or not (18:00 - 09:00)
  isNightTime(h) {
    return h < 9 || h > 18
  }

  componentDidMount() {
    const url = `http://api.openweathermap.org/data/2.5/forecast?id=${this.props.id}&units=metric&APPID=${process.env.OPENWEATHERMAP_API_KEY}`
    const factorMPStoKMPH = 3.6

    axios.get(url).then(
      res => {
        // Restructure forecast-data
        let forecast = res.data.list.map(ent => {
          return {
            date: ent.dt_txt.split(' ')[0],
            time: ent.dt_txt.split(' ')[1],
            weather: ent.weather[0].description,
            temp: ent.main.temp,
            clouds: ent.clouds.all,
            rain: Object.values(ent.rain || {})[0] || 0,
            snow: Object.values(ent.snow || {})[0] || 0,
            wind: ent.wind.speed * factorMPStoKMPH,
            icon: ent.weather[0].icon,
          }
        })

        // Calculate average weather for day-time
        let averageForecast = {}

        forecast.forEach((e) => {
          let hour = parseFloat(e.time.split(':')[0])

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

        Object.entries(averageForecast).forEach(([_, f]) => {
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
  id: PropTypes.string,
}
