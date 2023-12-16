import { FastifyInstance, FastifyPluginOptions } from "fastify";

export default async function aboutRoute(
  server: FastifyInstance,
  _options: FastifyPluginOptions,
) {
  server.get("/about", async function handler(_request, reply) {
    return reply.view("./templates/about.ejs");
  });
}
