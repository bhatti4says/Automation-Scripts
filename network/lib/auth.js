
import jwt from 'jsonwebtoken'

const DEFAULT_SECRET = 'dev-secret-change-me'

export function signToken(payload) {
  const secret = process.env.JWT_SECRET || DEFAULT_SECRET
  return jwt.sign(payload, secret, { expiresIn: '1d' })
}

export function verifyToken(token) {
  try {
    const secret = process.env.JWT_SECRET || DEFAULT_SECRET
    return jwt.verify(token, secret)
  } catch (e) {
    return null
  }
}
