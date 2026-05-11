import { NextRequest, NextResponse } from 'next/server'
import { getProviders, createProvider } from '@/lib/providers'
import { isAuthenticated } from '@/lib/auth'

export async function GET() {
  return NextResponse.json(await getProviders())
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const provider = await createProvider(body)
  return NextResponse.json(provider, { status: 201 })
}
