// Action Types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// Action Creators
export const login = (value) => ({type: LOGIN, payload: value});
export const logout = () => ({type: LOGOUT, payload: null});

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
