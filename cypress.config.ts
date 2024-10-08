import { defineConfig } from "cypress";
import path from "path";

import dotenv from "dotenv";
const envLocal = dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export default defineConfig({
  e2e: {
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
    numTestsKeptInMemory: 1,
    experimentalMemoryManagement: true,
    baseUrl: "http://localhost:8000",
    viewportHeight: 900,
    viewportWidth: 1600,
  },
  env: {
    ...(envLocal.parsed ?? process.env),
  },
});
