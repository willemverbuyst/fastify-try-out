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
    return reply.view("templates/about.ejs");
  });
  fastify.get("/whoami", async function handler(request, reply) {
    return reply.view("templates/whoami-form.ejs");
  });
  fastify.post(
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
    async function handler(request, reply) {
      return reply.view("templates/whoami.ejs", {
        name: request.body.name,
      });
    }
  );
}
