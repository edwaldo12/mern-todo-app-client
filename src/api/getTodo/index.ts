import axios, { AxiosResponse } from 'axios'
import url from 'helper/url'

import { GetTodoResult } from 'types/todos.type'

export const getTodo = async (id: string): Promise<AxiosResponse<GetTodoResult>> => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${url}/api/todo/${id}`
    })

    return res
  } catch (error) {
    throw new Error(error)
  }
}