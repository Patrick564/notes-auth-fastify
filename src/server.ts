import { fastify, FastifyInstance } from 'fastify'
import { MySQLPromisePool } from '@fastify/mysql'
import plugin from 'fastify-plugin'

import { Env, secretsPlugin } from './environment/base.js'
import { usersRoute } from './routes/users.js'
import { databasePlugin } from './models/database.js'
import { Server } from 'http'

const server: FastifyInstance<Server> = fastify({ logger: true })

declare module 'fastify' {
  interface FastifyInstance {
    mysql: MySQLPromisePool,
    config: Env
  }
}

server.register(usersRoute, { prefix: '/api/users' })
server.register(usersRoute, { prefix: '/api/tasks' })

const start = async () => {
  try {
    await server.register(plugin(secretsPlugin))
    await server.register(plugin(databasePlugin))

    await server.listen({ host: '0.0.0.0', port: server.config.PORT })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()
