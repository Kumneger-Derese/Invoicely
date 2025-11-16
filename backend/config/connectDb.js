import { prisma } from './prisma.js'

const connectDb = async () => {
  try {
    await prisma.$connect()
    console.log('Connected to database!')
  } catch (error) {
    await prisma.$disconnect()
    console.log('Database disconnected', error)
  }
}

export default connectDb
