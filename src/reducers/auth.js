import { SET_AUTH_USER, RESET_AUTH_STATE } from '../types'

const INITIAL_STATE = {
  user: null,
  isAuth: false,
  isAuthResolved: false,
}

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_AUTH_USER:
      return { user: action.user, isAuth: !!action.user, isAuthResolved: true }
    case RESET_AUTH_STATE:
      return { ...state, isAuthResolved: false }
    default:
      return state
  }
}

export default auth
