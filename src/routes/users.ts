import { FastifyInstance } from 'fastify'

const usersRoute = async (router: FastifyInstance, opts: any, done: any) => {
  router.post('/register', async (req, reply) => {
    reply.send({ 'status': 'register route' })
  })

  router.get('/:username', async (req, reply) => {
    reply.send({ 'status': 'username get' })
  })

  router.patch('/:username', async (req, reply) => {
    reply.send({ 'status': 'username update' })
  })

  done()
}

export { usersRoute }
