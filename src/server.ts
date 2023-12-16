import formbody from "@fastify/formbody";
import fastifyView from "@fastify/view";
import ejs from "ejs";
import fastify from "fastify";
import routes from "./routes";

export const server = fastify({
  logger: true,
});

server.register(fastifyView, {
  engine: {
    ejs: ejs,
  },
  layout: "./templates/layout.ejs",
});

server.register(formbody);

server.register(routes);
