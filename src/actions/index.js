import {
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICE_SUCCESS,
  REQUEST_SERVICE,
} from '../types'

import * as api from '../api'

export const requestService = () => {
  return {
    type: REQUEST_SERVICE,
  }
}

export const resetPreviousService = () => {
  return {
    type: FETCH_SERVICE_SUCCESS,
    service: {},
  }
}

export const fetchServices = () => {
  return api.fetchServices().then((services) => ({
    type: FETCH_SERVICES_SUCCESS,
    services,
  }))
}

export const fetchServiceById = (serviceId) => {
  return api.fetchServiceById(serviceId).then((service) => ({
    type: FETCH_SERVICE_SUCCESS,
    service,
  }))
}
