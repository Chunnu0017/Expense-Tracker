import axios from "axios";

const BASE_URL = "https://expense-tracker-backend-bwh1.onrender.com"

export const publicRequest = axios.create({
    baseURL:BASE_URL, 
})