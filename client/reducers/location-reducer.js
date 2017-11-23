const locationReducer = (state = {lat: 0, lon: 0}, action) => {
  switch (action.type) {
  case 'USER_LOCATION':
    return {...state, ...action.userLocation}
  default:
    return state
  }
}

export default locationReducer
