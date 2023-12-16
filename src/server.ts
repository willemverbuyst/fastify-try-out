import formbody from "@fastify/formbody";
import fastifyView from "@fastify/view";
import ejs from "ejs";
import fastify from "fastify";
import pino from "pino";
import pretty from "pino-pretty";

import rootRoute from "./routes/root.routes";
import aboutRoute from "./routes/about.routes";
import visitorsRoute from "./routes/visitors.routes";
import whoAreYouRoute from "./routes/whoAreYou.routes";
import whoAmIRoute from "./routes/whoAmI.routes";
import lowDbPlugin, { DbSchema } from "./db";
import { Low } from "lowdb";

export const server = fastify({
  logger: pino(pretty()),
});

declare module "fastify" {
  interface FastifyInstance {
    db: Low<DbSchema>;
  }
}

server.register(fastifyView, {
  engine: {
    ejs: ejs,
  },
  layout: "./templates/layout.ejs",
});

server.register(lowDbPlugin);

server.register(formbody);

server.register(rootRoute);
server.register(aboutRoute);
server.register(visitorsRoute);
server.register(whoAreYouRoute);
server.register(whoAmIRoute);
