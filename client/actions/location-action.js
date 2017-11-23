const locationAction = (type, location) => {
  switch (type) {
  case 'USER_LOCATION':
    return {
      type: 'USER_LOCATION',
      userLocation: {
        lat: location.lat,
        lon: location.lon,
      },
    }
  default:
    return {
      type: 'USER_LOCATION',
      userLocation: {
        lat: 0,
        lon: 0,
      },
    }
  }
}

export default locationAction
