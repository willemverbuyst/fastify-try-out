import fp from "fastify-plugin";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

export interface DbSchema {
  visitors: string[];
}

interface LowDbPluginOptions {}

export default fp<LowDbPluginOptions>(async (server) => {
  const adapter = new JSONFile<DbSchema>("db.json");
  const db = new Low<DbSchema>(adapter, { visitors: [] });

  await db.read();
  db.data ||= { visitors: [] }; // Initialize data if empty
  await db.write();

  server.decorate("db", db);
});
