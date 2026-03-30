import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import * as reviewsController from "../controllers/reviews.controller.js";

const router = Router();

router.get("/movie/:movieId", reviewsController.getMovieReviews);
router.use(authMiddleware);
router.post("/", reviewsController.createReview);
router.put("/:id", reviewsController.updateReview);
router.delete("/:id", reviewsController.deleteReview);

export default router;