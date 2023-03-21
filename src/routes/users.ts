import { FastifyInstance, FastifyServerOptions } from 'fastify'
import { RowDataPacket } from 'mysql2'

const usersRoute = async (router: FastifyInstance, _opts: FastifyServerOptions, done: any) => {
  router.get<{
    Params: {
      username: string
    }
  }>('/:username', { onRequest: [router.authenticate] }, async (req, reply) => {
    const { username } = req.params
    const [rows, fields] = await router.mysql.execute<RowDataPacket[]>('SELECT * FROM users WHERE username = ?', [username])

    reply.send({ rows, fields })
  })

  router.patch<{
    Params: {
      username: string
    },
    Body: {
      username: string
    }
  }>('/:username', { onRequest: [router.authenticate] }, async (req, reply) => {
    const { username: originalUsername } = req.params
    const { username: newUsername } = req.body
    const [rows, fields] = await router.mysql.execute<RowDataPacket[]>('UPDATE users SET username = ? WHERE username = ?', [`@${newUsername}`, originalUsername])

    reply.send({ rows, fields })
  })

  done()
}

export { usersRoute }
