import { FastifyInstance, FastifyServerOptions } from 'fastify'
import { RowDataPacket } from 'mysql2'
import { compare, hash } from 'bcrypt'

import { HttpStatusCode } from '../environment/statusCodes.js'

const authRoute = async (router: FastifyInstance, _opts: FastifyServerOptions, done: any) => {
  router.post<{
    Body: {
      email: string,
      password: string
    }
  }>('/login', async (req, reply) => {
    const { email, password } = req.body

    if (email === '' || password === '') {
      reply.status(HttpStatusCode.BAD_REQUEST).send({ error: 'email and password required' })
    }

    const [rows, _fields] = await router.mysql.execute<RowDataPacket[]>('SELECT username, password FROM users WHERE email = ?', [email])

    if (!(await compare(password, rows[0]['password']))) {
      reply.status(HttpStatusCode.BAD_REQUEST).send({ error: 'passwords not match' })
    }

    const jwt = router.jwt.sign({ username: rows[0]['username'] })

    reply.status(HttpStatusCode.OK).send({ email, jwt })
  })

  router.post<{
    Body: {
      username: string,
      email: string,
      password: string
    }
  }>('/register', async (req, reply) => {
    const { username, email, password } = req.body

    if (username === '' || email === '' || password === '') {
      reply.status(HttpStatusCode.BAD_REQUEST).send({ error: 'username, email and password required' })
    }

    const hashPwd = await hash(password, 10)
    const [rows, fields] = await router.mysql.execute<RowDataPacket[]>('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [`@${username}`, email, hashPwd])

    reply.status(HttpStatusCode.CREATED).send({ rows, fields })
  })

  done()
}

export { authRoute }
