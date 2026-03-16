import axios from "axios"

const API = "http://localhost:8080/api"

export const getRegistrationsByEvent = (eventId) => {
return axios.get(`${API}/registrations/event/${eventId}`)
}

export const getFieldsByEvent = (eventId) => {
return axios.get(`${API}/fields/event/${eventId}`)
}

export const approveRegistration = (id) => {
return axios.put(`${API}/registrations/approve/${id}`)
}

export const rejectRegistration = (id) => {
return axios.put(`${API}/registrations/reject/${id}`)
}

export const submitRegistration = async (formData) => {
  const res = await axios.post(`${API}/submit-registration`, formData);
  return res.data;
};

export const getRegistrations = async () => {
  const res = await axios.get(`${API}/api/registrations`);
  return res.data;
};