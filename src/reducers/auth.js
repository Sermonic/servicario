import { SET_AUTH_USER } from '../types'

const INITIAL_STATE = {
  user: null,
  isAuth: false,
  isAuthResolved: false,
}

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_AUTH_USER:
      return { user: action.user, isAuth: !!action.user, isAuthResolved: true }
    default:
      return state
  }
}

export default auth
