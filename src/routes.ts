import type { FastifyRequest } from "fastify";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

interface BodyType {
  name: string;
}

export default async function routes(
  server: FastifyInstance,
  _options: FastifyPluginOptions
) {
  server.get("/", async function handler() {
    return { ping: "pong" };
  });
  server.get("/about", async function handler(_request, reply) {
    return reply.view("./templates/about.ejs");
  });
  server.get("/whoami", async function handler(_request, reply) {
    return reply.view("./templates/whoami-form.ejs");
  });
  server.post(
    "/whoami",
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
      return reply.view("./templates/whoami.ejs", {
        name: request.body.name,
      });
    }
  );
}
