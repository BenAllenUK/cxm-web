export function setLocalItem(key: string, data: object) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data))
  }
}

export function getLocalItem(key: string) {
  if (typeof window !== 'undefined') {
    const savedState = localStorage.getItem(key)
    return savedState ? JSON.parse(savedState) : null
  }
  return null
}
