import React, { Component } from 'react'
import axios from 'axios'
import Sun from 'react-icons/lib/ti/weather-sunny'
import Wind from 'react-icons/lib/ti/weather-windy'
import Cloudy from 'react-icons/lib/ti/weather-partly-sunny'
import Cloud from 'react-icons/lib/ti/weather-cloudy'
import CloudWind from 'react-icons/lib/ti/weather-windy-cloudy'
import Rain from 'react-icons/lib/ti/weather-shower'
import Storm from 'react-icons/lib/ti/weather-stormy'
import Snow from 'react-icons/lib/ti/weather-snow'

const WeatherIcon = (props) => {
  if (props.data.snow > 1) {
    return <Snow/>
  } else if (props.data.rain >= 10) {
    return <Storm/>
  } else if (props.data.rain >= 1) {
    return <Rain/>
  } else if (props.data.clouds >= 50) {
    if (props.data.wind >= 30) {
      return <CloudWind/>
    } else {
      return <Cloud/>
    }
  } else if (props.data.clouds >= 20) {
    return <Cloudy/>
  } else if (props.data.wind >= 30) {
    return <Wind/>
  } else {
    return <Sun/>
  }
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

  componentWillMount() {
    const url = `http://api.openweathermap.org/data/2.5/forecast?id=${this.props.id}&units=metric&APPID=${process.env.OPENWEATHERMAP_API_KEY}`

    axios.get(url).then(
      res => {
        // restructure forecast-data
        let forecast = res.data.list.map(ent => {
          return {
            date: ent.dt_txt.split(' ')[0],
            time: ent.dt_txt.split(' ')[1],
            weather: ent.weather[0].description,
            temp: ent.main.temp,
            //mintemp: ent.main.temp_min,
            //maxtemp: ent.main.temp_max,
            clouds: ent.clouds.all,
            rain: Object.values(ent.rain || {})[0] || 0,
            snow: Object.values(ent.snow || {})[0] || 0,
            wind: ent.wind.speed * 3.6,
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
          //f.mintemp = (f.mintemp || 0) + e.mintemp
          //f.maxtemp = (f.maxtemp || 0) + e.maxtemp
          f.clouds = (f.clouds || 0) + e.clouds
          f.rain = (f.rain || 0) + e.rain
          f.snow = (f.snow || 0) + e.snow
          f.wind = (f.wind || 0) + e.wind
          f.count = (f.count || 0) + 1
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
        Object.keys(this.state.forecast).map(
          (date, i) => {
            let f = this.state.forecast[date]

            return (
              <div key={i}>
                <div className='date'>{date}</div>
                <div className='icon'><WeatherIcon data={f}/></div>
                <div className='temp'>{f.temp} °C</div>
                <div className='rain'>{f.rain} mm</div>
                <div className='snow'>{f.snow} mm</div>
                <div className='wind'>{f.wind} km/h</div>
                <div className='clouds'>{f.clouds} %</div>
              </div>
            )
          }
        )
      }
    </div>
}
