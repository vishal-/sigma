import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { logger } from '@/lib/logger'

async function logAndSaveRequest(method: string) {
  const timestamp = new Date()
  logger.info({ method, timestamp: timestamp.toISOString() }, `Logging API request: ${method} /check`)

  const logEntry = await prisma.requestLog.create({
    data: {
      method,
      timestamp,
    },
  })

  return logEntry
}

export async function GET(request: NextRequest) {
  try {
    const logEntry = await logAndSaveRequest(request.method)
    return NextResponse.json(logEntry)
  } catch (error) {
    logger.error({ error }, 'Failed to process check request')
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const logEntry = await logAndSaveRequest(request.method)
    return NextResponse.json(logEntry)
  } catch (error) {
    logger.error({ error }, 'Failed to process check request')
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const logEntry = await logAndSaveRequest(request.method)
    return NextResponse.json(logEntry)
  } catch (error) {
    logger.error({ error }, 'Failed to process check request')
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const logEntry = await logAndSaveRequest(request.method)
    return NextResponse.json(logEntry)
  } catch (error) {
    logger.error({ error }, 'Failed to process check request')
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
