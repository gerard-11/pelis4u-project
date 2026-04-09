import { Router } from "express";
import * as moviesController from "../controllers/movies.controller.js";
import {getGenres, getMoviesByGenre} from "../controllers/movies.controller.js";


const router = Router();

router.get("/trending", moviesController.getTrending);
router.get("/genres", moviesController.getGenres);
router.get("/genres/:genreId", moviesController.getMoviesByGenre);
router.get("/search", moviesController.searchMovies);
router.get("/:id", moviesController.getMovieById);
router.get("/:id/credits", moviesController.getMovieCredits);
router.get("/:id/similar", moviesController.getSimilarMovies);

export default router;