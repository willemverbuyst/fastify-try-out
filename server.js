import Fastify from "fastify";
const fastify = Fastify({
  logger: true,
});

fastify.route({
  method: "GET",
  url: "/",
  schema: {
    // request needs to have a querystring with a `name` parameter
    querystring: {
      type: "object",
      properties: {
        name: { type: "string" },
      },
      required: ["name"],
    },
    // the response needs to be an object with an `hello` property of type 'string'
    response: {
      200: {
        type: "object",
        properties: {
          hello: { type: "string" },
        },
      },
    },
  },

  preHandler: async (_request, _reply) => {
    console.log("checking some things before handler is executed");
  },
  handler: async (request, _reply) => {
    return { hello: request.query.name };
  },
});

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
