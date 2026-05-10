import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || 'change-me-in-production-32-chars!!'
)
const COOKIE = 'admin_session'

export async function createSession(): Promise<string> {
  return new SignJWT({ admin: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('8h')
    .sign(SECRET)
}

export async function verifySession(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, SECRET)
    return true
  } catch {
    return false
  }
}

export async function getSessionToken(): Promise<string | undefined> {
  const store = await cookies()
  return store.get(COOKIE)?.value
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getSessionToken()
  if (!token) return false
  return verifySession(token)
}

export function checkCredentials(username: string, password: string): boolean {
  return (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  )
}

export { COOKIE }
