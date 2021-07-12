import Api from "./../../service/Api";
import { link, navigate } from 'svelte-routing';

// Method to get a list of all Pokemon
export const Login = async (request) => {
    try {
      const response = await Api.post("/login",request);
      return response;
    } catch (error) {
      console.error(error);
    }
};

const Logout = ()=>{
  localStorage.clear();
  navigate("/auth/login", { replace: true });
}

const Auth = {
  Login
}

// export  Auth