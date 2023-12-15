/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
export default async function routes(fastify, options) {
  fastify.get("/", async function handler(request, reply) {
    return { ping: "pong" };
  });
  fastify.get("/about", async function handler(request, reply) {
    return { info: "this is the about route" };
  });
  fastify.get(
    "/whoami",
    {
      // request needs to have a querystring with a `name` parameter
      schema: {
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
    },
    async function handler(request, reply) {
      return { hello: request.query.name };
    }
  );
}
