import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Sun from 'react-icons/lib/ti/weather-sunny'
import Wind from 'react-icons/lib/ti/weather-windy'
import Cloudy from 'react-icons/lib/ti/weather-partly-sunny'
import Cloud from 'react-icons/lib/ti/weather-cloudy'
import CloudWind from 'react-icons/lib/ti/weather-windy-cloudy'
import Rain from 'react-icons/lib/ti/weather-shower'
import Storm from 'react-icons/lib/ti/weather-stormy'
import Snow from 'react-icons/lib/ti/weather-snow'

const WeatherIcon = ({ id, forceDay }) => {
  const iconName = forceDay ? id.replace(/n$/, 'd') : id

  return <img src={`http://openweathermap.org/img/w/${iconName}.png`}/>
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

  componentDidMount() {
    const url = `http://api.openweathermap.org/data/2.5/forecast?id=${this.props.id}&units=metric&APPID=${process.env.OPENWEATHERMAP_API_KEY}`

    axios.get(url).then(
      res => {
        // Restructure forecast-data
        let forecast = res.data.list.map(ent => {
          return {
            date: ent.dt_txt.split(' ')[0],
            time: ent.dt_txt.split(' ')[1],
            weather: ent.weather[0].description,
            temp: ent.main.temp,
            // Mintemp: ent.main.temp_min,
            // Maxtemp: ent.main.temp_max,
            clouds: ent.clouds.all,
            rain: Object.values(ent.rain || {})[0] || 0,
            snow: Object.values(ent.snow || {})[0] || 0,
            wind: ent.wind.speed * 3.6,
            icon: ent.weather[0].icon,
          }
        })

        // Calculate average weather from 09:00 to 18:00
        let averageForecast = {}

        forecast.forEach((e) => {
          let hour = parseFloat(e.time.split(':')[0])

          if (hour < 9 || hour > 18) {
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
          // F.mintemp = (f.mintemp || 0) + e.mintemp
          // F.maxtemp = (f.maxtemp || 0) + e.maxtemp
          f.clouds = (f.clouds || 0) + e.clouds
          f.rain = (f.rain || 0) + e.rain
          f.snow = (f.snow || 0) + e.snow
          f.wind = (f.wind || 0) + e.wind
          f.count = (f.count || 0) + 1
          f.icon = e.icon
        })

        for (let i in averageForecast) {
          let f = averageForecast[i]

          let cnt = f.count

          delete f.count

          f.weather = f.weather[Math.floor(f.weather.length / 2)]

          for (let k in f) {
            if (!isNaN(f[k])) {
              f[k] = Math.round(f[k] / cnt)
            }
          }
        }

        this.setState({
          city: {
            id: res.data.city.id,
            name: res.data.city.name,
            country: res.data.city.country,
            lat: res.data.city.coord.lat,
            lon: res.data.city.coord.lon,
          },
          forecast: averageForecast,
        }, () => {
          console.log(this.state.forecast)
        })
      }
    )

  }

  render = () =>
    <div className='weather'>
      {
        Object.entries(this.state.forecast).map(([date, f], i) =>
          <div key={i}>
            <div className='date'>{date}</div>
            <div className='icon'><WeatherIcon id={f.icon} forceDay/></div>
            <div className='temp'>{f.temp} °C</div>
            <div className='rain'>{f.rain} mm</div>
            <div className='snow'>{f.snow} mm</div>
            <div className='wind'>{f.wind} km/h</div>
            <div className='clouds'>{f.clouds} %</div>
          </div>
        )
      }
    </div>
}

Weather.propTypes = {
  id: PropTypes.string,

}
