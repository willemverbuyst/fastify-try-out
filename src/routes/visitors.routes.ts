import { FastifyInstance, FastifyPluginOptions } from "fastify";

export default async function visitorsRoute(
  server: FastifyInstance,
  _options: FastifyPluginOptions,
) {
  server.get("/visitors", async function handler() {
    return { visitors: server.db.data.visitors };
  });
}
