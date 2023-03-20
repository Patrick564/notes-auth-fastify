import { Server } from 'http'

import { fastify, FastifyInstance } from 'fastify'
import plugin from 'fastify-plugin'

import { secretsPlugin } from './environment/base.js'
import { databasePlugin } from './models/database.js'
import { jwtPlugin } from './environment/jwt.js'

import { usersRoute } from './routes/users.js'
import { authRoute } from './routes/auth.js'

const server: FastifyInstance<Server> = fastify({ logger: true })

server.register(plugin(secretsPlugin))
server.register(plugin(databasePlugin))
server.register(plugin(jwtPlugin))

server.register(authRoute, { prefix: '/api/auth' })
server.register(usersRoute, { prefix: '/api/users' })
server.register(usersRoute, { prefix: '/api/tasks' })

const start = async () => {
  const port = process.env.PORT || 8080

  try {
    await server.listen({ host: '0.0.0.0', port: Number(port) })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()
