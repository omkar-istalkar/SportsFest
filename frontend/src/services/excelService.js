import axios from "axios";

const BASE_URL = "http://localhost:8080/api/excel";

export const uploadExcel = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(`${BASE_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    },{Credential:true});

    return res.data;
};

export const getExcelById = async (id) => {
    const res = await axios.get(`${BASE_URL}/${id}`,{withCredentials:true});
    return res.data;
};