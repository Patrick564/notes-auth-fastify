import { FastifyInstance } from 'fastify'
import fastifyEnv from '@fastify/env'

interface Env {
  PORT: number,
  DB_URL: string
}

const schema = {
  type: 'object',
  required: ['PORT', 'DB_URL'],
  properties: {
    PORT: {
      type: 'number',
      default: 8080
    },
    DB_URL: {
      type: 'string',
      default: 'mysql://'
    }
  }
}

const secretsPlugin = (router: FastifyInstance, _opts: any, done: any) => {
  router.log.info('Loading enviroment variables')

  router.register(fastifyEnv, { schema, dotenv: true })

  done()
}

export { Env, secretsPlugin }
