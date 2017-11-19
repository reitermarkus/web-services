const backgroundImages = [
  'https://static.pexels.com/photos/414459/pexels-photo-414459.jpeg',
  'https://static.pexels.com/photos/355241/pexels-photo-355241.jpeg',
  'https://static.pexels.com/photos/161039/panorama-roppen-village-mountains-161039.jpeg',
  'https://static.pexels.com/photos/414369/pexels-photo-414369.jpeg',
]

const imageReducer = (state = {bgImages: backgroundImages}, action) => {
  switch (action.type) {
  case 'BACKGROUND_IMAGES':
    return {bgImages: backgroundImages}
  default:
    return state
  }
}

export default imageReducer
