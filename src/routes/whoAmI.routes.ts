import { Visitor } from "db";
import type { FastifyRequest } from "fastify";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

type BodyType = Visitor;

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
            firstName: { type: "string" },
            lastName: { type: "string" },
            age: { type: "string" },
            jobType: { type: "string" },
            sexType: { type: "string" },
          },
          required: ["firstName", "lastName", "age", "jobType", "sexType"],
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
      const { firstName, lastName, age, jobType, sexType } = request.body;

      server.db.data.visitors.push({
        firstName,
        lastName,
        age,
        jobType,
        sexType,
      });

      return reply.view("./templates/who-am-i.ejs", {
        firstName,
        lastName,
        age,
        jobType,
        sexType,
      });
    },
  );
}
