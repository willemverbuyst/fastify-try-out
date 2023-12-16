import { server } from "server";

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

await start();
