import axios from "axios";

import { getTodo } from "api/getTodo";
import url from 'helper/url';

export const updateTitle = async (
  {id, title} : {id:string, title:string}
): Promise<void> => {
  try {
    const getTodoRes = await getTodo(id);

    if (getTodoRes.status === 200) {
      axios({
        method: "PUT",
        url: `${url}/api/update-todo/${id}`,
        data: {title : title, status : getTodoRes.data.result.status},
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};
