import api from "./api";

export const login = async (email, password) => {
    const params = new URLSearchParams();
    params.append("userNmae", email);
    params.append("password", password);

    const res = await api.post("/login", params);

    return res.data;
};

export const register = async(user) => {
    const res = await api.post("/api/auth/register", user);

    return res.data;
}