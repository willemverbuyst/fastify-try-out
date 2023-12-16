import type { FastifyRequest } from "fastify";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

type BodyType = { name: string };

export default async function whoAmIRoute(
  server: FastifyInstance,
  _options: FastifyPluginOptions,
) {
  server.post(
    "/who-am-i",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            name: { type: "string" },
          },
          required: ["name"],
        },
        response: {
          200: {
            type: "object",
            properties: {
              hello: { type: "string" },
            },
          },
        },
      },
    },
    async function handler(request: FastifyRequest<{ Body: BodyType }>, reply) {
      const name = request.body.name;
      server.db.data.visitors.push(name);
      return reply.view("./templates/who-am-i.ejs", {
        name,
      });
    },
  );
}
