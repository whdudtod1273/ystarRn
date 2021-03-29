// Action Types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// Action Creators
export const login = (value) => ({type: LOGIN, payload: value});
export const logout = (value) => ({type: LOGOUT, payload: value});

const auth = {};
export default (state = auth, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return null;
    default:
      return state;
  }
};
