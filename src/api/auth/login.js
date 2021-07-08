import Api from "./../../service/Api";

// Method to get a list of all Pokemon
export const Login = async (request) => {
    try {
      const response = await Api.post("/login",request);
      return response;
    } catch (error) {
      console.error(error);
    }
};