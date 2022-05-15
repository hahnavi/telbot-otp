import { NextFunction, Request, Response } from 'express'
import prisma from '../lib/prisma'

async function auth (req: Request, res: Response, next: NextFunction) {
  const key = req.headers.api_key as string
  try {
    if (key) {
      const apiKey = await prisma.apiKey.findFirst(
        { where: { AND: [{ key }, { OR: [{ exp: { gt: new Date() } }, { exp: { isSet: false } }] }] } }
      )
      if (apiKey) {
        next()
        return
      }
    }
    res.status(401).json({ message: 'unauthorized' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'internal server error' })
  }
}

export default auth
