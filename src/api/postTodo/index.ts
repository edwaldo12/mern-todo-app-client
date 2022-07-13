import axios from 'axios'
import url from 'helper/url'

export const postTodo = async (data: any): Promise<void> => {
  try {
    await axios({
      method: 'POST',
      url: `${url}/api/add-todo`,
      data
    })
  } catch (error) {
    throw new Error(error)
  }
}