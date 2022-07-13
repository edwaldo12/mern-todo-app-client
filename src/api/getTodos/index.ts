import axios from 'axios'
import url from 'helper/url'

import { Todos } from 'types/todos.type'

export const getTodos = async (): Promise<Todos> => {
  try {
    const res = await axios.get(`${url}/api/todos`)

    return res.data
  } catch (error) {
    throw new Error(error)
  }
}