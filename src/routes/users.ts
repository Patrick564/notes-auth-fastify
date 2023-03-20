import { FastifyInstance, FastifyServerOptions } from 'fastify'
import { hash } from 'bcrypt'

const usersRoute = async (router: FastifyInstance, _opts: FastifyServerOptions, done: any) => {
  router.post<{
    Body: {
      username: string,
      email: string,
      password: string
    }
  }>('/register', async (req, reply) => {
    const { username, email, password } = req.body
    const hashPwd = await hash(password, 10)
    const [rows, fields] = await router.mysql.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [`@${username}`, email, hashPwd])

    reply.send({ rows, fields })
  })

  router.get<{
    Params: {
      username: string
    }
  }>('/:username', async (req, reply) => {
    const { username } = req.params
    const [rows, fields] = await router.mysql.execute('SELECT * FROM users WHERE username = ?', [username])

    reply.send({ rows, fields })
  })

  router.patch<{
    Params: {
      username: string
    },
    Body: {
      username: string
    }
  }>('/:username', async (req, reply) => {
    const { username: originalUsername } = req.params
    const { username: newUsername } = req.body
    const [rows, fields] = await router.mysql.execute('UPDATE users SET username = ? WHERE username = ?', [`@${newUsername}`, originalUsername])

    reply.send({ rows, fields })
  })

  done()
}

export { usersRoute }
