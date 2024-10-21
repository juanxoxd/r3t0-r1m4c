import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { SwapiModule } from './swapi.module'
import { NestFactory } from '@nestjs/core'


import { Server } from 'http'

import { ExpressAdapter } from '@nestjs/platform-express'
import { Handler, Context } from 'aws-lambda'
import { createServer, proxy } from 'aws-serverless-express'
import { eventContext } from 'aws-serverless-express/middleware'
import express from 'express'


const binaryMimeTypes: string[] = []

let cachedServer: Server

async function bootstrapServer(): Promise<Server> {
  if (!cachedServer) {
    const expressApp = express()
    const nestApp = await NestFactory.create(
      SwapiModule,
      new ExpressAdapter(expressApp)
    )
    nestApp.use(eventContext())
    nestApp.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204
    })

     const swaggerConfig = new DocumentBuilder()
       .setTitle('SWAPI API')
       .setDescription('API que interactúa con SWAPI')
       .setVersion('1.0')
       .addTag('Swapi')
       .build()

     const document = SwaggerModule.createDocument(nestApp, swaggerConfig)
     SwaggerModule.setup('swapi/swagger', nestApp, document)

    await nestApp.init()
    cachedServer = createServer(expressApp, undefined, binaryMimeTypes)
  }
  return cachedServer
}

export const handler: Handler = async (event: any, context: Context) => {
  cachedServer = await bootstrapServer()
  return proxy(cachedServer, event, context, 'PROMISE').promise
}




// async function bootstrap() {
//   const app = await NestFactory.create(SwapiModule)

//   const config = new DocumentBuilder()
//     .setTitle('SWAPI API')
//     .setDescription('API que interactúa con la API de SWAPI')
//     .setVersion('1.0')
//     .addTag('Swapi')
//     .build();

//   const document = SwaggerModule.createDocument(app, config)
//   SwaggerModule.setup('api', app, document)

//   app.enableCors({
//     origin: '*',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     preflightContinue: false,
//     optionsSuccessStatus: 204
//   })
//   await app.listen(5000)
// }

// bootstrap()
