const development = require(`../config/development.json`)
const production = require(`../config/production.json`)

export const config = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return development
    case 'production':
      return production
    default:
      throw new Error(`Env: ${process.env} doesn't have any config file`)
  }
}
