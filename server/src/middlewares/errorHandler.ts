import { Request, Response, NextFunction } from "express";
import axios from "axios";

export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
): void {
    if (axios.isAxiosError(err)) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.status_message ?? "Error al contactar TMDB";

        res.status(status).json({ message });
        return;
    }


    if (err instanceof Error) {
        res.status(500).json({ message: err.message });
        return;
    }

    res.status(500).json({ message: "Error interno del servidor" });
}