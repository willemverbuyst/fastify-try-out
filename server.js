import fastifyView from "@fastify/view";
import ejs from "ejs";
import Fastify from "fastify";
import routes from "./routes.js";

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyView, {
  engine: {
    ejs: ejs,
  },
});

fastify.register(routes);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
