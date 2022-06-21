import fastifyAutoload from "@fastify/autoload"
import fastify, { FastifyLoggerInstance, FastifySchema, FastifyTypeProviderDefault, RouteOptions } from "fastify"
import { RouteGenericInterface } from "fastify/types/route"
import { ResolveFastifyRequestType } from "fastify/types/type-provider"
import { Server, IncomingMessage, ServerResponse } from "http"
import path from "path"
const autoloadd = require('fastify-autoload')

const server = fastify({ logger: true })

// server.get('/', async (request, reply) => {
//     return "hi"
// })

// Declare a route
server.get('/', function (req, reply) {
    reply.send({ hello: 'world' })
})

// Register routes to handle blog posts
 const blogRoutes = require('./blogs')
blogRoutes.forEach((route: RouteOptions<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown, FastifySchema, FastifyTypeProviderDefault, unknown, ResolveFastifyRequestType<FastifyTypeProviderDefault, FastifySchema, RouteGenericInterface>, FastifyLoggerInstance>, index: any) => {
    server.route(route)
})

const server1 = fastify()

server.register(autoload, {
  dir: path.join(__dirname, 'routs')
})

server.listen({ port: 3000 }).catch((e) => {
    process.exit(1)
})

function autoload(autoload: any, arg1: { dir: string }) {
    throw new Error("Function not implemented.")
}
