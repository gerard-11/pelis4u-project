import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../config/db.js'
import { RegisterInput, LoginInput } from '../middlewares/validate.js'

export const register = async (
    req: Request<{}, {}, RegisterInput>,
    res: Response
): Promise<void> => {
    const { username, email, password } = req.body

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            res.status(409).json({ message: 'El email ya está registrado' })
            return
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: { username, email, password: hashedPassword },
            select: { id: true, username: true, email: true, createdAt: true }
        })

        res.status(201).json({ message: 'Usuario creado exitosamente', user })
    } catch (error) {
        console.error('Error en register:', error)
        res.status(500).json({ message: 'Error interno del servidor' })
    }
}

export const login = async (
    req: Request<{}, {}, LoginInput>,
    res: Response
): Promise<void> => {
    const { email, password } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, username: true, email: true, password: true }
        })

        if (!user) {
            res.status(401).json({ message: 'Credenciales inválidas' })
            return
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            res.status(401).json({ message: 'Credenciales inválidas' })
            return
        }

        const accessToken = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: '15m' }
        )

        const refreshToken = jwt.sign(
            { userId: user.id },
            process.env.JWT_REFRESH_SECRET as string,
            { expiresIn: '7d' }
        )

        await prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId: user.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            }
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.json({
            accessToken,
            user: { id: user.id, username: user.username, email: user.email }
        })
    } catch (error) {
        console.error('Error en login:', error)
        res.status(500).json({ message: 'Error interno del servidor' })
    }
}

export const refresh = async (
    req: Request,
    res: Response
): Promise<void> => {
    const token = req.cookies.refreshToken as string | undefined

    if (!token) {
        res.status(401).json({ message: 'No autorizado' })
        return
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET as string
        ) as { userId: string }

        const storedToken = await prisma.refreshToken.findUnique({ where: { token } })

        if (!storedToken) {
            res.status(401).json({ message: 'Token inválido' })
            return
        }

        if (storedToken.expiresAt < new Date()) {
            await prisma.refreshToken.delete({ where: { token } })
            res.status(401).json({ message: 'Token expirado' })
            return
        }

        const accessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.JWT_SECRET as string,
            { expiresIn: '15m' }
        )

        res.json({ accessToken })
    } catch {
        res.status(401).json({ message: 'Token inválido' })
    }
}

export const logout = async (
    req: Request,
    res: Response
): Promise<void> => {
    const token = req.cookies.refreshToken as string | undefined

    if (token) {
        await prisma.refreshToken.deleteMany({ where: { token } })
    }

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    })

    res.json({ message: 'Sesión cerrada exitosamente' })
}