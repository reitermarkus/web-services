const notificationReducer = (state = [], action) => {
  switch (action.type) {
  case 'ERROR':
  case 'SUCCESS':
  case 'NOTIFICATION':
    return {
      type: action.type,
      messages: [...state, ...action.messages],
    }
  default:
    return state
  }
}

export default notificationReducer
