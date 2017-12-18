export const set = (data) => {
  console.log('store set', data)
  try {
    const localStore = JSON.parse(localStorage.getItem('lclApp')) || {}
    const newLocalStore = Object.assign(localStore, data)

    localStorage.setItem('lclApp', JSON.stringify(newLocalStore))
  } catch(e) {
    console.log('Error processing local storage', e)
  }
}

export const get = () => {
  try {
    const localStore = localStorage.getItem('lclApp')
    return JSON.parse(localStore) || undefined
  } catch(error) {
    return undefined
  }
}

export const clear = () => {
  try {
    localStorage.removeItem('lclApp')
  } catch(e) {
    console.log('Error processing local storage', e)
  }
}
