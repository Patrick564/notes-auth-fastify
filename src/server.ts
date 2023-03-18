import fastify from 'fastify'

import { usersRoute } from './routes/users.js'

const server = fastify({ logger: true })

server.register(usersRoute, { prefix: '/api/users' })
server.register(usersRoute, { prefix: '/api/tasks' })

server.listen({ host: '0.0.0.0', port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`Server listening at ${address}`)
})
