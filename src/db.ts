import fp from "fastify-plugin";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { faker } from "@faker-js/faker";

type Visitor = {
  firstName: string;
  lastName: string;
  age: number;
  jobType: string;
  sexType: "female" | "male";
};

export interface DbSchema {
  visitors: Visitor[];
}

interface LowDbPluginOptions {}

function createDummyVisitors(): Visitor[] {
  return [...Array(20).keys()].map(() => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: Math.floor(Math.random() * 100),
    jobType: faker.person.jobType(),
    sexType: faker.person.sexType(),
  }));
}

export default fp<LowDbPluginOptions>(async (server) => {
  const visitors = createDummyVisitors();

  const adapter = new JSONFile<DbSchema>("db.json");
  const db = new Low<DbSchema>(adapter, { visitors });

  await db.read();
  db.data ||= { visitors }; // Initialize data if empty
  await db.write();

  server.decorate("db", db);
});
