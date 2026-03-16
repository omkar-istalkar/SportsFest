import axios from "axios"

const API = "http://localhost:8080/api"

export const getRegistrationsByEvent = (eventId) => {
return axios.get(`${API}/registrations/event/${eventId}`, {withCredentials:true})
}

export const getFieldsByEvent = (eventId) => {
return axios.get(`${API}/fields/event/${eventId}`, {withCredentials:true})
}

export const approveRegistration = (id) => {
return axios.put(`${API}/registrations/approve/${id}`, {withCredentials:true})
}

export const rejectRegistration = (id) => {
return axios.put(`${API}/registrations/reject/${id}`, {withCredentials:true})
}

export const submitRegistration = async (formData) => {
  const res = await axios.post(`${API}/submit-registration`,{withCredentials:true}, formData);
  return res.data;
};

export const getRegistrations = async () => {
  const res = await axios.get(`${API}/api/registrations`, {withCredentials:true});
  return res.data;
};