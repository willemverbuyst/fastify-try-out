import fp from "fastify-plugin";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

export interface DbSchema {
  names: string[];
}

interface LowDbPluginOptions {}

export default fp<LowDbPluginOptions>(async (fastify, opts) => {
  const adapter = new JSONFile<DbSchema>("db.json");
  const db = new Low<DbSchema>(adapter, { names: [] });

  await db.read();
  db.data ||= { names: [] }; // Initialize data if empty
  await db.write();

  fastify.decorate("db", db);
});
