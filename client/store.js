import { createStore } from 'redux'
import { combineReducers } from 'redux'
import imageReducer from './reducers/image-reducer'
import locationReducer from './reducers/location-reducer'

if (typeof window === 'undefined') {
  global.window = {}
}

const preloadedState = window.__PRELOADED_STATE__

delete window.__PRELOADED_STATE__

const reducers = combineReducers({
  imageReducer: imageReducer,
  locationReducer: locationReducer,
})

const store = createStore(reducers, preloadedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
