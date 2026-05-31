const DEFAULT_API_URL = 'http://localhost:5000';

const trimTrailingSlash = (value) => value.replace(/\/+$/, '');

const rawApiUrl = import.meta.env.VITE_API_URL || DEFAULT_API_URL;
const apiRoot = trimTrailingSlash(rawApiUrl);

export const apiBaseUrl = apiRoot.endsWith('/api') ? apiRoot : `${apiRoot}/api`;
