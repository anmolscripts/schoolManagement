import "dotenv/config"; // ✅ This loads .env automatically
import { connectDB } from "../src/lib/db";
import { seedInitialData } from "../src/lib/seed";

(async () => {
  await connectDB();
  await seedInitialData();
  console.log("✅ Seeding Completed.");
  process.exit(0);
})();