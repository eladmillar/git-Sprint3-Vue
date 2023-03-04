import { utilService } from '../../../services/util.service.js'
// import { axios } from '../../../lib/axios.js'

export const youtubeService = {
  getYoutubeTopRes,
  //   API_KEY,
}
const STORAGE_KEY = 'youtubeDB'

const API_KEY = 'AIzaSyD9_iqARjy74PqkjSJM0Nco0qyDUp41gHA'
function getYoutubeTopRes(value) {
  const youtube = utilService.loadFromStorage(STORAGE_KEY)
  if (youtube) return Promise.resolve(youtube.data)
  return axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API_KEY}&q=${value}`
    )
    .then((res) => {
      if (youtube) {
        res.name = value
        // ?
        utilService.saveToStorage(STORAGE_KEY, res)
      } else {
        res.name = 'SpongeBob'
        utilService.saveToStorage(STORAGE_KEY, res)
      }
      //   console.log('Hi from then()')
      return res.data
    })
    .catch((err) => {
      console.log('err: ', err)
      throw 'Had a problem'
    })
  // .finally(() => {
  //   console.log('Finally!')
  // })
}

