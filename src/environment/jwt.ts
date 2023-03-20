import { FastifyInstance } from 'fastify'
import jwt from '@fastify/jwt'

const jwtPlugin = async (router: FastifyInstance, _opts: any, done: any) => {
  router.register(jwt, { secret: 'secret' })

  router.decorate('authenticate', async (req: any, reply: any) => {
    try {
      await req.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })

  done()
}

export { jwtPlugin }
