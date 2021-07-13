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
export const getUsersById = async(id) => {
  try {
    const response = await Api.get(`/users/${id}`);
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

// Get a pokemon details by name
export const putUsers = async(data,id) => {
  console.log(data)
  try {
    const response = await Api.put(`/users/${id}`,`${data}`);
    return response;
  } catch (error) {
    let response='401'
    console.log(error)
    // return response
  }
};

// Get a pokemon details by name
export const deleteUsers = async(id) => {
  try {
    const response = await Api.delete(`/users/${id}`);
    return response;
  } catch (error) {
    let response='401'
    console.log(error)
    // return response
  }
};