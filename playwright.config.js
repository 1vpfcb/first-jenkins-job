import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url"; // 1. Import this built-in Node utility

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



dotenv.config({ path: path.resolve(__dirname, './.env') });

const envPath = path.resolve(__dirname, '../.env');
console.log("🧐 Node is looking for the .env file exactly here:", envPath);

// Optional: warn if env is missing
if (!process.env.SEP_USERNAME || !process.env.SEP_PASSWORD) {
  console.warn("Warning: SEP_USERNAME or SEP_PASSWORD not set. Basic auth credentials will not be available.");
}

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 3,
  reporter: "html",

  use: {
    baseURL: "https://qa.sep.tdtm.cydeo.com",
    // Only add httpCredentials if both env vars are present
    ...(process.env.SEP_USERNAME && process.env.SEP_PASSWORD
      ? {
        httpCredentials: {
          username: process.env.SEP_USERNAME,
          password: process.env.SEP_PASSWORD,
        },
      }
      : {}),
    trace: "retain-on-failure",
    video: { mode: "retain-on-failure", size: { width: 1920, height: 1080 } },
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"],
        viewport:{ width: 1920, height: 1080}

      },
    },
  ],
});