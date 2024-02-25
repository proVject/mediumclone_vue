import axios from '@/api/axios'

const getUrl = (slug) => `/profiles/${slug}/follow`

const followProfile = (slug) => {
  const url = getUrl(slug)
  return axios.post(url).then((response) => response.data.profile)
}

const unfollowProfile = (slug) => {
  const url = getUrl(slug)
  return axios.delete(url).then((response) => response.data.profile)
}

export default {
  followProfile,
  unfollowProfile,
}
