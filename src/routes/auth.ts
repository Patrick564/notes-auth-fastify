import { FastifyInstance, FastifyServerOptions } from 'fastify'
import { compare } from 'bcrypt'

const authRoute = async (router: FastifyInstance, _opts: FastifyServerOptions, done: any) => {
  router.post<{
    Body: {
      email: string,
      password: string
    }
  }>('/login', async (req, reply) => {
    const { email, password } = req.body
    const [rows, _fields] = await router.mysql.execute<any>('SELECT username, password FROM users WHERE email = ?', [email])

    if (!(await compare(password, rows[0]['password']))) {
      reply.send({ 'error': 'passwords not match' })
    }

    const jwt = router.jwt.sign({ username: rows[0]['username'] })

    reply.send({ email, jwt })
  })

  done()
}

export { authRoute }
