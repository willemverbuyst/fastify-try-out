import { FastifyInstance, FastifyPluginOptions } from "fastify";

export default async function namesRoute(
  server: FastifyInstance,
  _options: FastifyPluginOptions,
) {
  server.get("/names", async function handler() {
    return { names: server.db.data.names };
  });
}
