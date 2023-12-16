import formbody from "@fastify/formbody";
import fastifyView from "@fastify/view";
import ejs from "ejs";
import fastify from "fastify";
import routes from "./routes";

const server = fastify({
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

const start = async () => {
  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
