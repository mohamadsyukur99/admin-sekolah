import Api from "../../service/Api";

export const getUsers = async () => {
  try {
    const response = await Api.get("/users");
    return response;
  } catch (error) {
    let response='401'
    return response
  }
};

// Get a pokemon details by name
export const getUsersByName = async(name) => {
  try {
    const response = await Api.get(`/usersnama/${name}`);
    return response;
  } catch (error) {
    let response='401'
    // console.log(error)
    return response
  }
};

// Get a pokemon details by name
export const getUsersByUsername = async(name) => {
  try {
    const response = await Api.get(`/usersname/${name}`);
    return response;
  } catch (error) {
    let response='401'
    // console.log(error)
    return response
  }
};

// Get a pokemon details by name
export const postUsers = async(data) => {
  try {
    const response = await Api.post(`/users`,`${data}`);
    return response;
  } catch (error) {
    let response='401'
    console.log(error)
    // return response
  }
};