import axios from "axios";

const API = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API
});

export const getEvents = () => api.get("/events");

export const createEvent = (data) =>
  api.post("/events", data);

export const updateEvent = (id,data) =>
  api.put(`/events/${id}`, data);

export const deleteEvent = (id) =>
  api.delete(`/events/${id}`);

export const toggleEvent = (id) =>
  api.put(`/events/toggle/${id}`);

export const getFields = (eventId) =>
  api.get(`/fields/event/${eventId}`);

export const createField = (eventId,data) =>
  api.post(`/fields/event/${eventId}`,data);

export const updateField = (id,data) =>
  api.put(`/fields/${id}`,data);

export const deleteField = (id) =>
  api.delete(`/fields/${id}`);

export const getResponses = (eventId) =>
  api.get(`/registrations/event/${eventId}`);

export const getEventById = async (id) => {
  const res = await axios.get(`${API}/events/${id}`);
  return res.data;
};