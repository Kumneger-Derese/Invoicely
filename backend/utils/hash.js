import bcrypt from 'bcryptjs'

const hashPassword = async plain => {
  return await bcrypt.hash(plain, 10)
}

const comparePassword = async (plain, hashed) => {
  return await bcrypt.compare(plain, hashed)
}

export { hashPassword, comparePassword }
