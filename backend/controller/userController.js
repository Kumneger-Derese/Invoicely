import bcrypt from 'bcryptjs'
import { prisma } from '../config/prisma.js'
import { ApiError } from '../utils/apiError.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { generateToken } from '../utils/generateToken.js'
import { comparePassword, hashPassword } from '../utils/hash.js'

const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body

  const userExists = await prisma.user.findUnique({
    where: { email }
  })

  if (userExists) {
    return next(new ApiError('User already exists', 400))
  }

  //hashed password
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { username, email, password: hashedPassword }
  })

  if (!user) return next(new ApiError('User not created.', 400))

  if (user) {
    const token = generateToken(user.id)
    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      token
    })
  } else {
    return next(new ApiError('Invalid user credentials.', 401))
  }
})

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) return next(new ApiError('User not registered.', 400))

  const isMatch = await comparePassword(password, user.password)

  if (!isMatch) return next(new ApiError('Password do not match.', 401))

  const token = generateToken(user.id)
  res.status(200).json({
    id: user.id,
    username: user.username,
    email: user.email,
    token
  })
})

const updateProfile = asyncHandler(async (req, res, next) => {
  const data = {}
  const userId = req.user?.id
  const { username, email, password } = req.body

  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) return next(new ApiError('User to update not found.', 404))

    if (username) data.username = username
    if (email) data.email = email
    if (password) {
      const hashedPassword = await hashPassword(password)
      data.password = hashedPassword
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
      omit: { password: true },
      include: { notifications: true, clients: true, invoices: true }
    })

    return res.status(200).json(updatedUser)
  } else {
    return next(new ApiError('User to update not authorized.', 404))
  }
})

//delete users account
const deleteUser = asyncHandler(async (req, res, next) => {
  const userId = req.user?.id

  if (userId) {
    const deletedUser = await prisma.user.delete({ where: { id: userId } })

    res.status(200).json({ message: 'User deleted.', deletedUser })
  } else {
    return next(new ApiError('User to delete not found.', 404))
  }
})

//Get user profile data
const getProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user?.id

  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { notifications: true, clients: true, invoices: true },
      omit: { password: true }
    })

    if (!user) {
      return next(new ApiError('User not found', 404))
    }

    return res.status(200).json(user)
  } else {
    return next(new ApiError('User not authorized.', 404))
  }
})

export { registerUser, loginUser, updateProfile, getProfile, deleteUser }
