export function toQueryString(obj = {}) {
  // https://stackoverflow.com/a/34209399/7027045
  const esc = encodeURIComponent
  const query = Object.keys(obj)
    .map(k => esc(k) + '=' + esc(obj[k]))
    .join('&')

  return `?${query}`
}
