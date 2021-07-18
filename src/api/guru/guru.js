import Api from "../../service/Api";

const getGuru = async () => {
  try {
    const response = await Api.get("/guru");
    return response;
  } catch (error) {
    let response='401'
    return response
  }
};

// Get a pokemon details by name
const getGuruByName = async(name) => {
  try {
    const response = await Api.get(`/gurufilter/${name}`);
    return response;
  } catch (error) {
    let response='401'
    // console.log(error)
    return response
  }
};

// Get a pokemon details by name
const getGuruNip = async(name) => {
  try {
    const response = await Api.get(`/nip/${name}`);
    return response;
  } catch (error) {
    let response='401'
    // console.log(error)
    return response
  }
};

// Get a pokemon details by name
const getGuruById = async(id) => {
  try {
    const response = await Api.get(`/guruid/${id}`);
    return response;
  } catch (error) {
    let response='401'
    // console.log(error)
    return response
  }
};

// Get a pokemon details by name
const postGuru = async(data) => {
  try {
    const response = await Api.post(`/guru`,`${data}`);
    return response;
  } catch (error) {
    let response='401'
    console.log(error)
    // return response
  }
};

// Get a pokemon details by name
const putGuru = async(data,id) => {
  try {
    const response = await Api.put(`/guru/${id}`,`${data}`);
    return response;
  } catch (error) {
    let response='401'
    console.log(error)
    // return response
  }
};

// Get a pokemon details by name
export const deleteGuru = async(id) => {
  try {
    const response = await Api.delete(`/guru/${id}`);
    return response;
  } catch (error) {
    let response='401'
    console.log(error)
    // return response
  }
};

const Guru = {
  getGuru,
  getGuruById,
  getGuruByName,
  getGuruNip,
  postGuru,
  putGuru,
  deleteGuru
}

export default Guru