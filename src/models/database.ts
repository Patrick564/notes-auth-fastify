import { FastifyInstance } from 'fastify'
import mysql from '@fastify/mysql'

const databasePlugin = async (router: FastifyInstance, _opts: any, done: any) => {
  router.log.info('Connecting to database')

  router.register(mysql, {
    connectionString: process.env.DB_URL,
    promise: true,
    ssl: {
      rejectUnauthorized: true
    }
  })

  done()
}

export { databasePlugin }
