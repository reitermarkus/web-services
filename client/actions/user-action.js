const userAction = (type, user) => {
  switch (type) {
  case 'GET_USER':
    return {
      type: 'GET_USER',
      user: user,
    }
  }
}

export default userAction
