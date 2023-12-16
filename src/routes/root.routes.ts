import { FastifyInstance, FastifyPluginOptions } from "fastify";

export default async function rootRoute(
  server: FastifyInstance,
  _options: FastifyPluginOptions,
) {
  server.get("/", async function handler() {
    return { ping: "pong" };
  });
}
