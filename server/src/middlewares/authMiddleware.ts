import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            userId?: string
        }
    }
}

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'No autorizado' })
        return
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as { userId: string }

        req.userId = decoded.userId
        next()
    } catch {
        res.status(401).json({ message: 'Token inválido o expirado' })
    }
}