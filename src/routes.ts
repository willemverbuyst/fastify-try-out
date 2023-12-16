import type { FastifyRequest } from "fastify";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { JSONPreset } from "lowdb/node";

type Data = {
  names: string[];
};

const defaultData: Data = { names: [] };
const db = await JSONPreset<Data>("db.json", defaultData);

interface BodyType {
  name: string;
}

export default async function routes(
  server: FastifyInstance,
  _options: FastifyPluginOptions,
) {
  server.get("/", async function handler() {
    return { ping: "pong" };
  });
  server.get("/about", async function handler(_request, reply) {
    return reply.view("./templates/about.ejs");
  });
  server.get("/names", async function handler() {
    return { names: db.data.names };
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
      const name = request.body.name;
      db.data.names.push(name);
      return reply.view("./templates/whoami.ejs", {
        name,
      });
    },
  );
}
