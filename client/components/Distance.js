import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Distance extends Component {
  constructor(props) {
    super(props)

    this.state = {
      from: this.props.from.replace(' ', '+'),
      to: this.props.to.replace(' ', '+'),
      lat1: 0,
      lon1: 0,
      lat2: 0,
      lon2: 0,
    }
  }

  distanceBetweenCoordinates() {
    // Copied from https://www.movable-type.co.uk/scripts/latlong.html
    let rad = 6371e3 // Meters
    let phi1 = this.state.lat1.toRadians()
    let phi2 = this.state.lat2.toRadians()
    let deltaPhi = (this.state.lat2 - this.state.lat1).toRadians()
    let deltaGamma = (this.state.lon2 - this.state.lon1).toRadians()

    let a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaGamma / 2) * Math.sin(deltaGamma / 2)
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return (rad * c) / 1000 // Kilometers
  }

  componentDidMount() {
    fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${this.state.from}&destinations=${this.state.to}&language=en&key=${this.props.apiKey}`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
  }

  render = () =>
    <fragment>
    </fragment>
}

Distance.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
}

/* Bad result: Innsbruck -> New York
{
   "destination_addresses" : [ "New York City, New York, USA" ],
   "origin_addresses" : [ "Innsbruck, Österreich" ],
   "rows" : [
      {
         "elements" : [
            {
               "status" : "ZERO_RESULTS"
            }
         ]
      }
   ],
   "status" : "OK"
}
*/

/* Good result: Innsbruck -> Vienna
{
   "destination_addresses" : [ "Vienna, Austria" ],
   "origin_addresses" : [ "Innsbruck, Austria" ],
   "rows" : [
      {
         "elements" : [
            {
               "distance" : {
                  "text" : "476 km",
                  "value" : 476192
               },
               "duration" : {
                  "text" : "4 hours 56 mins",
                  "value" : 17783
               },
               "status" : "OK"
            }
         ]
      }
   ],
   "status" : "OK"
}
*/
