import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { updateProvider, deleteProvider } from '@/lib/providers'
import { isAuthenticated } from '@/lib/auth'

type Params = { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Params) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = await req.json()
  const updated = await updateProvider(id, body)

  if (!updated) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  revalidatePath('/')
  revalidatePath('/business-banking')
  return NextResponse.json(updated)
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const deleted = await deleteProvider(id)

  if (!deleted) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  revalidatePath('/')
  revalidatePath('/business-banking')
  return new NextResponse(null, { status: 204 })
}
