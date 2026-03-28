import axios from "axios";
import { env } from "../config/env.js";

export const tmdbClient = axios.create({
    baseURL:env.TMDB_BASE_URL,
    params: {
        api_key: env.TMDB_API_KEY,
        language: "es-MX",
    },
});