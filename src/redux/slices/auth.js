import { createSlice } from '@reduxjs/toolkit';
// utils
import axios, { API_ENDPOINTS } from 'src/utils/axios';
import { isValidToken, setSession } from '../utils';

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

const initialUser = () => {
  const item = window.localStorage.getItem('user_details');
  //* * Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {};
};

const initialState = {
  loading: false,
  user: null,
  authenticated: false,
  refToken: null,
  userData: initialUser(),
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticated(state, action) {
      state.loading = false;
      state.authenticated = true;
      state.userData = action.payload.user_details;
      state.refToken = action.payload.refreshToken;
      localStorage.setItem('user_details', JSON.stringify(action.payload.user_details));
    },
    unauthenticated(state) {
      state.loading = false;
      state.authenticated = false;
      state.userData = null;
      state.refToken = null;
      sessionStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(REFRESH_KEY);
      localStorage.removeItem(REFRESH_KEY);
      localStorage.removeItem('user_details');
      localStorage.removeItem('projects');
      localStorage.removeItem('selected_project');
      delete axios.defaults.headers.common.Authorization;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function initialize() {
  return async (dispatch) => {
    try {
      const accessToken = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
      const refreshToken = JSON.parse(window.localStorage.getItem(REFRESH_KEY));

      if (refreshToken && isValidToken(refreshToken)) {
        // setSession(accessToken)

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken, refreshToken, dispatch);
          const user_details = JSON.parse(window.localStorage.getItem('user_details'));
          dispatch(slice.actions.authenticated({ user_details, refreshToken }));
          // dispatch(checkCredits())
        } else {
          console.log('aaa');
          const { data } = await axios.post(API_ENDPOINTS.auth.refreshToken, {
            refresh: refreshToken,
            userId: user_details?._id
          });
          const tokens = data;
          const newAccessToken = tokens?.token;
          const newRefreshToken = tokens?.refreshToken;
          setSession(newAccessToken, newRefreshToken, dispatch);
          const user_details = JSON.parse(window.localStorage.getItem('user_details'));
          dispatch(slice.actions.authenticated({ user_details, refreshToken }));
          // dispatch(checkCredits())
        }
      }
      if (refreshToken && !isValidToken(refreshToken)) {
        alert('Token expired');
        dispatch(slice.actions.unauthenticated());
        window.location.href = paths.auth.login;
      }
    } catch (error) {
      console.error(error);
      // dispatch(slice.actions.unauthenticated())
    }
  };
}

export function login(params) {
  return async (dispatch) => {
    try {
      const response = await axios.post(API_ENDPOINTS.auth.login, params);
      const { token, refreshToken, user } = response.data?.data;
      console.log(token, refreshToken, user);
      const accessToken = token;

      setSession(accessToken, refreshToken, dispatch);

      dispatch(slice.actions.authenticated({ user_details: user, refreshToken }));
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

export function register(email, password, firstName, lastName) {
  const data = {
    email,
    password,
    firstName,
    lastName,
  };

  return async (dispatch) => {
    try {
      const response = await axios.post(API_ENDPOINTS.auth.register, data);

      const { accessToken, user } = response.data;

      sessionStorage.setItem(STORAGE_KEY, accessToken);

      dispatch(slice.actions.authenticated(user));
    } catch (error) {
      console.error(error);
    }
  };
}

export function logout() {
  return async (dispatch) => {
    const refreshToken = JSON.parse(window.localStorage.getItem(REFRESH_KEY));
    const params = { refresh: refreshToken };
    try {
      dispatch(slice.actions.unauthenticated());
    } catch (error) {
      dispatch(slice.actions.unauthenticated());
      console.error(error);
    }
  };
}
