import jwt from 'jsonwebtoken'
import { prisma } from '../config/prisma.js'
import { ApiError } from '../utils/apiError.js'
import { asyncHandler } from './asyncHandler.js'

const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, username: true, email: true }
      })

      next()
    } catch (error) {
      return next(new ApiError('Not authorized token field.',401))
    }
  } else {
    return next(new ApiError('Not authorized no token.',401,))
  }
})

export { protect }
