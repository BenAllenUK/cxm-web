function isLocalhost() {
  return process.env.NODE_ENV !== 'production' && window.location.hostname === 'localhost'
}

export default isLocalhost