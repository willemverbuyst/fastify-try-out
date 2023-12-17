import { FastifyInstance, FastifyPluginOptions } from "fastify";

export default async function visitorsRoute(
  server: FastifyInstance,
  _options: FastifyPluginOptions,
) {
  server.get("/visitors", async function handler(_, reply) {
    const visitors = server.db.data.visitors;
    return reply.view("./templates/visitors.ejs", {
      visitors,
    });
  });
}
