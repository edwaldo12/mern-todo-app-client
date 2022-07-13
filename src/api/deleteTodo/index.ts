import axios from 'axios'
import url from 'helper/url'

export const deleteTodo = async (id: string): Promise<void> => {
  try {
    axios({
      method: 'DELETE',
      url: `${url}/api/remove-todo/${id}`
    })
  } catch (error) {
    throw new Error(error)
  }
}