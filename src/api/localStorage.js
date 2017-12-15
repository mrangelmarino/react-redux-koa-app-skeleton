export const set = (key, data) => {
  localStorage.setItem('lclApp.' + key, JSON.stringify(data))
}

export const get = key => {
  const localStore = localStorage.getItem('lclApp.' + key)
  return JSON.parse(localStore) || null
}
