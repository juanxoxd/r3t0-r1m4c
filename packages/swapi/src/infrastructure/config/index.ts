export const envVariables = () => ({
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
  },
  aws_config: {
    region: process.env.SWAPI_AWS_REGION,
    accessKeyId: process.env.SWAPI_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.SWAPI_AWS_SECRET_ACCESS_KEY
  },
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  SWAPI_BASE_URL: process.env.SWAPI_BASE_URL
})
