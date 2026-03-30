import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js"; // ajusta el path
import * as watchlistController from "../controllers/watchlist.controller.js";

const router = Router();

router.use(authMiddleware);

router.get("/", watchlistController.getWatchlist);
router.post("/", watchlistController.addToWatchlist);
router.delete("/:movieId", watchlistController.removeFromWatchlist);

export default router;