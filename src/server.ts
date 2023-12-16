import formbody from "@fastify/formbody";
import fastifyView from "@fastify/view";
import ejs from "ejs";
import fastify from "fastify";
import pino from "pino";
import pretty from "pino-pretty";
import routes from "./routes";

export const server = fastify({
  logger: pino(pretty()),
});

server.register(fastifyView, {
  engine: {
    ejs: ejs,
  },
  layout: "./templates/layout.ejs",
});

server.register(formbody);

server.register(routes);
