const locationAction = (type, location) => {
  switch (type) {
  case 'USER_LOCATION':
    return {
      type: 'USER_LOCATION',
      userLocation: {
        city: (location.address || {}).city || '',
        country: (location.address || {}).country || '',
        countryCode: (location.address || {}).country_code || '',
        lat: location.lat,
        lon: location.lon,
      },
    }
  default:
    return {
      type: 'USER_LOCATION',
      userLocation: {
        city: '',
        country: '',
        countryCode: '',
        lat: 0,
        lon: 0,
      },
    }
  }
}

export default locationAction
