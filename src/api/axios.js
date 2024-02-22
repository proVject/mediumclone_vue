import axios from 'axios'
import persistenceStorage from '@/helpers/persistenceStorage'

axios.defaults.baseURL = 'https://api.realworld.io/api'

axios.interceptors.request.use((config) => {
  const token = persistenceStorage.getItem('accessToken')
  config.headers.Authorization = token ? `Token ${token}` : ''
  return config
})

export default axios
