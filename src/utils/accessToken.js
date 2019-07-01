const ACCESS_TOKEN_KEY = 'accessToken';

export const setAccessToken = (token) => {
  window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const getAccessToken = () => window.localStorage.getItem(ACCESS_TOKEN_KEY);

export const clearAccessToken = () => {
  window.localStorage.setItem(ACCESS_TOKEN_KEY, null);
};

export const hasAccessToken = () => !!getAccessToken();
