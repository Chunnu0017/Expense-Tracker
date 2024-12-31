import axios from "axios";

const BASE_URL = "https://expense-tracker-olho.onrender.com"

export const publicRequest = axios.create({
    baseURL:BASE_URL,
})
