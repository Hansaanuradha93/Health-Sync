const cron = require("node-cron");
const { executeAggregationJob } = require("./controllers/reportController");

// Schedule the job to run every day at midnight
cron.schedule("0 0 * * *", async () => {
  console.log("Starting the scheduled aggregation job...");

  try {
    await executeAggregationJob();
    console.log("Scheduled aggregation job completed successfully.");
  } catch (error) {
    console.error("Error running the scheduled aggregation job:", error);
  }
});

console.log("Scheduler initialized. Job will run daily at midnight.");
