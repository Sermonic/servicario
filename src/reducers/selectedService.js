import { combineReducers } from 'redux'
import { FETCH_SERVICE_SUCCESS } from '../types'

const initSelectedService = () => {
  const item = (state = {}, action) => {
    switch (action.type) {
      case FETCH_SERVICE_SUCCESS:
        return action.service
      default:
        return state
    }
  }

  return combineReducers({ item })
}

const selectedService = initSelectedService()

export default selectedService
