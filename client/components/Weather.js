// innsbruck id: 2775220
// url: api.openweathermap.org/data/2.5/forecast?id=2775220&APPID=d60a62434499d77e7dcaf5906f92e102

import React, { Component } from 'react'
import axios from 'axios'

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
    const url = `http://api.openweathermap.org/data/2.5/forecast?id=${this.props.id}&units=metric&APPID=d60a62434499d77e7dcaf5906f92e102`

    axios.get(url).then(
      res => {
        // restructure forecast-data
        let fc = res.data.list.map(ent => {
          return {
            date: ent.dt_txt.split(' ')[0],
            time: ent.dt_txt.split(' ')[1],
            weather: ent.weather[0].description,
            temp: ent.main.temp,
            mintemp: ent.main.temp_min,
            maxtemp: ent.main.temp_max,
            clouds: ent.clouds.all,
            rain: Math.round((Object.values(ent.rain || {})[0] || 0) * 1000) / 1000,
            snow: Math.round((Object.values(ent.snow || {})[0] || 0) * 1000) / 1000,
            wind: ent.wind.speed * 3.6,
          }
        })

        let gfc = {}
        fc.forEach(function(e) {
          let date = e.date
          let hour = parseFloat(e.time.split(':')[0])

          delete e.date
          delete e.time

          if (!gfc[date]) {
            gfc[date] = {}
          }

          gfc[date][hour] = e
        });

        this.setState({
          city: {
            id: res.data.city.id,
            name: res.data.city.name,
            country: res.data.city.country,
            lat: res.data.city.coord.lat,
            lon: res.data.city.coord.lon,
          },
          forecast: gfc,
        }, () => {
          console.log(this.state.forecast)
        })
      }
    )

  }

  render = () => `${this.state.city.name} (${this.state.city.country})`
}
