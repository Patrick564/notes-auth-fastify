import { FastifyInstance } from 'fastify'

const tasksRoute = async (router: FastifyInstance, opts: any, done: any) => {
  router.get('/:username', async (req, reply) => {
    reply.send({ 'status': 'register route' })
  })

  router.post('/:username', async (req, reply) => {
    reply.send({ 'status': 'username get' })
  })

  router.get('/:username/:id', async (req, reply) => {
    reply.send({ 'status': 'username update' })
  })

  router.patch('/:username/:id', async (req, reply) => {
    reply.send({ 'status': 'username update' })
  })

  router.delete('/:username/:id', async (req, reply) => {
    reply.send({ 'status': 'username update' })
  })

  done()
}

export { tasksRoute }
