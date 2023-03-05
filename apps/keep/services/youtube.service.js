import { utilService } from '../../../services/util.service.js'

export const youtubeService = {
  getYoutubeTopRes,
  
}
const STORAGE_KEY = 'youtubeDB'

const API_KEY = 'AIzaSyBPsMo-e5_YOYOYJR5EYqtbEak2iqTR-og'
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
        res.name = 'video'
        utilService.saveToStorage(STORAGE_KEY, res)
      }
      
      return res.data
    })
    .catch((err) => {
      console.log('err: ', err)
      throw 'Had a problem'
    })
  
}

