import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../config/db.js'

export const register = async (req, res) => {
    const { username, email, password } = req.body
    console.log('Body recibido:', req.body)

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return res.status(409).json({ message: 'El email ya está registrado' })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            },

            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true
            }
        })

        res.status(201).json({
            message: 'Usuario creado exitosamente',
            user
        })

    } catch (error) {
        console.error('Error en register:', error)
        res.status(500).json({ message: 'Error interno del servidor' })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                username: true,
                email: true,
                password: true
            }
        })

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' })
        }

        const accessToken = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
    )

        const refreshToken = jwt.sign(
            { userId: user.id },
            process.env.JWT_REFRESH_SECRET,
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
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        })

    } catch (error) {
        console.error('Error en login:', error)
        res.status(500).json({ message: 'Error interno del servidor' })
    }
}

export const refresh = async (req, res) => {
    const token = req.cookies.refreshToken

    if (!token) {
        return res.status(401).json({ message: 'No autorizado' })
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET
        )

        const storedToken = await prisma.refreshToken.findUnique({
            where: { token }
        })

        if (!storedToken) {
            return res.status(401).json({ message: 'Token inválido' })
        }

        if (storedToken.expiresAt < new Date()) {
            await prisma.refreshToken.delete({ where: { token } })
            return res.status(401).json({ message: 'Token expirado' })
        }

        const accessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
    )

        res.json({ accessToken })

    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' })
    }
}

export const logout = async (req, res) => {
    const token = req.cookies.refreshToken

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