import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../generated/prisma/client.ts'

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL as string
})
const prisma = (globalThis as any).prisma ?? new PrismaClient({adapter})

if (process.env.NODE_ENV === 'development') {
    (globalThis as any).prisma = prisma
}

export default prisma