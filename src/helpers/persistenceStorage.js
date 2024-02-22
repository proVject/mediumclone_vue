const getItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (e) {
    console.log('Error getting data from localStorage', e)
    return null
  }
}

const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.log('Error setting data from localStorage', e)
  }
}

export default {
  getItem,
  setItem,
}
