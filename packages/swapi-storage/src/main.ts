import { Server } from 'http'

import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import { Handler, Context } from 'aws-lambda'
import { createServer, proxy } from 'aws-serverless-express'
import { eventContext } from 'aws-serverless-express/middleware'
import express from 'express'

import { SwapiStorageModule } from './swapi-storage.module'

const binaryMimeTypes: string[] = []

let cachedServer: Server

async function bootstrapServer(): Promise<Server> {
  if (!cachedServer) {
    const expressApp = express()
    const nestApp = await NestFactory.create(
      SwapiStorageModule,
      new ExpressAdapter(expressApp)
    )
    nestApp.use(eventContext())
    nestApp.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204
    })
    await nestApp.init()
    cachedServer = createServer(expressApp, undefined, binaryMimeTypes)
  }
  return cachedServer
}

export const handler: Handler = async (event: any, context: Context) => {
  cachedServer = await bootstrapServer()
  return proxy(cachedServer, event, context, 'PROMISE').promise
}

// import { NestFactory } from '@nestjs/core'

// import { SwapiStorageModule } from './swapi-storage.module'

// async function bootstrap() {
//   const app = await NestFactory.create(SwapiStorageModule)
//   app.enableCors({
//     origin: '*',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     preflightContinue: false,
//     optionsSuccessStatus: 204
//   })
//   await app.listen(4000)
// }

// bootstrap()
