module.exports = {
  timeout: 30000,
  name: process.env.REACT_APP_NAME,
  detail: process.env.REACT_APP_DETAIL,

  // URLs
  baseUrl: process.env.REACT_APP_API_URL,
  authUrl: process.env.REACT_APP_AUTH_URL,

  // formats of date and time
  timeFormat: 'HH:mm:ss',
  dateFormat: 'YYYY-MM-DD',
  dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
};
