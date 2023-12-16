import { FastifyInstance, FastifyPluginOptions } from "fastify";

export default async function whoAreYouRoute(
  server: FastifyInstance,
  _options: FastifyPluginOptions,
) {
  server.get("/who-are-you", async function handler(_request, reply) {
    return reply.view("./templates/who-are-you.ejs");
  });
}
