const notificationAction = (type, messages) => {
  switch (type) {
  case 'ERROR':
    return {
      type: 'ERROR',
      messages: messages,
    }
  case 'NOTIFICATION':
    return {
      type: 'NOTIFICATION',
      messages: messages,
    }
  case 'SUCCESS':
    return {
      type: 'SUCCESS',
      messages: messages,
    }
  }
}

export default notificationAction
