import axios from "../../api/axios";
import { ApiEndpoints } from "../../api/endpoints";

export async function getAll(controller){

    const response = await axios.get(
        ApiEndpoints.users.getAll,
        {
          signal: controller.signal,
        }
      );
      console.log(response.data);

    return response;
}