const userReducer = (state = {}, action) => {
  switch (action.type) {
  case 'GET_USER':
    return {
      user: action.user,
    }
  default:
    return state
  }
}

export default userReducer
