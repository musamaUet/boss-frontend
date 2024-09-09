// routes
import { paths } from 'src/routes/paths';
// utils
import axios from 'src/utils/axios';
import { initialize } from './slices/auth';
// ----------------------------------------------------------------------

function jwtDecode(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );
  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

export const isValidToken = (tokenKey) => {
  if (!tokenKey) {
    return false;
  }

  const decoded = jwtDecode(tokenKey);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = (accessToken, dispatch) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTimestamp = Math.floor(Date.now() / 1000);
  const difference = (accessToken - currentTimestamp) * 1000;

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    dispatch(initialize());
  }, difference);
};

// ----------------------------------------------------------------------

export const setSession = (accessToken, refreshToken, dispatch) => {
  if (accessToken) {
    sessionStorage.setItem('accessToken', accessToken);
    localStorage.setItem('accessToken', JSON.stringify(accessToken));

    sessionStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('refreshToken', JSON.stringify(refreshToken));

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // This function below will handle when token is expired
    const { exp } = jwtDecode(accessToken); // ~3 days by minimals server

    tokenExpired(exp, dispatch);
  } else {
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    localStorage.removeItem('refreshToken');
    delete axios.defaults.headers.common.Authorization;
  }
};
