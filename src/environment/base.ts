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

export { Env, schema }
