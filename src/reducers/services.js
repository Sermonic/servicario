import { combineReducers } from 'redux'
import { FETCH_SERVICES_SUCCESS } from '../types'

const initServices = () => {
  const all = (state = [], action) => {
    switch (action.type) {
      case FETCH_SERVICES_SUCCESS:
        return action.services
      default:
        return state
    }
  }

  return combineReducers({ all })
}

const services = initServices()

export default services
