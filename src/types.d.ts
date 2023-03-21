import { MySQLPromisePool } from '@fastify/mysql'

import { Env } from './environment/base.js'

declare module 'fastify' {
  interface FastifyInstance {
    mysql: MySQLPromisePool,
    config: Env,
    authenticate: () => Promise<void>
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { username: string },
    user: {
      username: string,
      email: string,
    }
  }
}
