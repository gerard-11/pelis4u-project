import jwt from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            userId?: string
        }
    }
}

export const authMiddleware = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No autorizado' })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as { userId: string }

        req.userId = decoded.userId
        next()

    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' })
    }
}