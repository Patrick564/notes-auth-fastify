import { FastifyInstance, FastifyRequest, FastifyReply, FastifyServerOptions } from 'fastify'
import jwt from '@fastify/jwt'

const jwtPlugin = async (router: FastifyInstance, _opts: FastifyServerOptions, done: any): Promise<void> => {
  router.register(jwt, { secret: 'secret' })

  router.decorate('authenticate', async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      await req.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })

  done()
}

export { jwtPlugin }
