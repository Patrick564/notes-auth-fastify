import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import mysql from '@fastify/mysql'

const databaseConn = async (router: FastifyInstance, _: FastifyPluginOptions) => {
  router.log.info('Connecting to database')

  router.register(mysql, {
    connectionString: router.config.DB_URL,
    promise: true,
    ssl: {
      rejectUnauthorized: true
    }
  })
}

export { databaseConn }
