import dotenv from 'dotenv'

dotenv.config({
  path: `./.env`
})

const ENVIRONMENTS = {
  DEV: 'development',
  STG: 'staging',
  PROD: 'production'
}

export interface IConfig {
  NODE_ENV: string
  PORT: number

  DATABASE_HOST: string
  DATABASE_PORT: number
  DATABASE_USER: string
  DATABASE_PASSWORD: string
  DATABASE_NAME: string

  NOTICES_TABLE_NAME: string

  USERS_TABLE_NAME: string

  COGNITO_USER_POOL_ID: string
  COGNITO_CLIENT_ID: string

  isDebug: boolean
  isDevelopment: boolean
  isStaging: boolean
  isProduction: boolean
}

export const config = {
  NODE_ENV: process.env.NODE_ENV || 'staging',
  PORT: Number(process.env.PORT || 3000),

  DATABASE_HOST: process.env.DATABASE_HOST || '',
  DATABASE_PORT: Number(process.env.DATABASE_PORT || 3306),
  DATABASE_USER: process.env.DATABASE_USER || '',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '',
  DATABASE_NAME: process.env.DATABASE_NAME || '',

  NOTICES_TABLE_NAME: process.env.NOTICES_TABLE_NAME || '',

  USERS_TABLE_NAME: process.env.USERS_TABLE_NAME || '',
  COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID || '',
  COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID || '',

  isDebug: Boolean(process.env.DEBUG) || false,
  isDevelopment: process.env.NODE_ENV === ENVIRONMENTS.DEV,
  isStaging: process.env.NODE_ENV === ENVIRONMENTS.STG,
  isProduction: process.env.NODE_ENV === ENVIRONMENTS.PROD
}
