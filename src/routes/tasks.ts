import { FastifyInstance, FastifyServerOptions } from 'fastify'
import { RowDataPacket } from 'mysql2'

const tasksRoute = async (router: FastifyInstance, _opts: FastifyServerOptions, done: any) => {
  router.get<{
    Params: {
      username: string
    }
  }>('/:username', async (req, reply) => {
    const { username } = req.params
    const [rows, _fields] = await router.mysql.execute<RowDataPacket[]>('SELECT * FROM tasks WHERE users_username = ?', [username])

    reply.send({ rows })
  })

  router.post<{
    Params: {
      username: string
    },
    Body: {
      content: string
    }
  }>('/:username', async (req, reply) => {
    const { username } = req.params
    const { content } = req.body
    const [rows, _fields] = await router.mysql.execute<RowDataPacket[]>('INSERT INTO tasks (content, user_username) VALUES (?, ?)', [content, username])

    reply.send({ rows })
  })

  router.get<{
    Params: {
      username: string,
      id: string
    }
  }>('/:username/:id', async (req, reply) => {
    const { username, id } = req.params
    const [rows, _fields] = await router.mysql.execute<RowDataPacket[]>('SELECT * FROM tasks WHERE users_username = ? AND id = ?', [username, id])

    reply.send({ rows })
  })

  router.patch<{
    Params: {
      username: string,
      id: string
    }
  }>('/:username/:id', async (req, reply) => {
    const { username, id } = req.params
    const [rows, _fields] = await router.mysql.execute<RowDataPacket[]>('UPDATE tasks SET content WHERE users_username = ? AND id = ?', [username, id])

    reply.send({ rows })
  })

  router.delete<{
    Params: {
      username: string,
      id: string
    }
  }>('/:username/:id', async (req, reply) => {
    const { username, id } = req.params
    const [rows, _fields] = await router.mysql.execute<RowDataPacket[]>('DELETE FROM tasks WHERE users_username = ? AND id = ?', [username, id])

    reply.send({ rows })
  })

  done()
}

export { tasksRoute }
