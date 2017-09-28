export const set = (key, data) => {
  localStorage.setItem('lclApp.' + key, JSON.stringify(data))
}

export const get = (key) => {
  const localStore = localStorage.getItem('lclApp.' + key)
  const store = JSON.parse(localStore) || {}
  return store
}