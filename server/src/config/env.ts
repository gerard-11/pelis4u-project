import 'dotenv/config'; // Esto carga el archivo .env automáticamente

export const env = {
    PORT: process.env.PORT || 3000,
    TMDB_BASE_URL: process.env.TMDB_BASE_URL,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
};