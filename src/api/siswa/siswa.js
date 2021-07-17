import Api from "../../service/Api";

export const getSiswa = async () => {
  try {
    const response = await Api.get("/siswa");
    return response;
  } catch (error) {
    let response='401'
    return response
  }
};

// Get a pokemon details by name
export const getSiswaByName = async(name) => {
  try {
    const response = await Api.get(`/siswafilter/${name}`);
    return response;
  } catch (error) {
    let response='401'
    // console.log(error)
    return response
  }
};

// Get a pokemon details by name
export const getSiswaByNoInduk = async(name) => {
  try {
    const response = await Api.get(`/no_induk/${name}`);
    return response;
  } catch (error) {
    let response='401'
    // console.log(error)
    return response
  }
};

// Get a pokemon details by name
export const getUSiswaById = async(id) => {
  try {
    const response = await Api.get(`/siswaid/${id}`);
    return response;
  } catch (error) {
    let response='401'
    // console.log(error)
    return response
  }
};

// Get a pokemon details by name
export const postSiswa = async(data) => {
  try {
    const response = await Api.post(`/siswa`,`${data}`);
    return response;
  } catch (error) {
    let response='401'
    console.log(error)
    // return response
  }
};

// Get a pokemon details by name
export const putSiswa = async(data,id) => {
  try {
    const response = await Api.put(`/siswa/${id}`,`${data}`);
    return response;
  } catch (error) {
    let response='401'
    console.log(error)
    // return response
  }
};

// Get a pokemon details by name
export const deleteSiswa = async(id) => {
  try {
    const response = await Api.delete(`/siswa/${id}`);
    return response;
  } catch (error) {
    let response='401'
    console.log(error)
    // return response
  }
};

const Siswa = {
  getSiswa,
  getSiswaByName,
  getSiswaByNoInduk,
  getUSiswaById,
  postSiswa,
  putSiswa,
  deleteSiswa
}

export default Siswa