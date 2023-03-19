import { fastify, FastifyInstance } from 'fastify'
import { MySQLPromisePool } from '@fastify/mysql'
import fastifyEnv from '@fastify/env'

import { Env, schema } from './environment/base.js'
import { usersRoute } from './routes/users.js'
import { databaseConn } from './models/database.js'

const server: FastifyInstance = fastify({ logger: true })

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
    await server.register(fastifyEnv, { schema, dotenv: true })
    await server.register(databaseConn)

    await server.listen({ host: '0.0.0.0', port: server.config.PORT })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()
