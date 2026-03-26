import { onSchedule } from "firebase-functions/v2/scheduler";
import { db } from "../config";
import { logger } from "firebase-functions";

/**
 * Scheduled job example: runs daily to perform maintenance tasks
 * such as cleaning up orphaned data or computing summaries.
 */
export const dailyCleanup = onSchedule("every 24 hours", async () => {
  logger.info("Running daily cleanup job");

  // Example: query and clean up stale temp documents
  const tenantsSnap = await db.collection("tenants").get();

  for (const tenantDoc of tenantsSnap.docs) {
    const staleQuery = tenantDoc.ref
      .collection("records")
      .where("status", "==", "draft")
      .where("lastUpdatedAt", "<", new Date(Date.now() - 90 * 24 * 60 * 60 * 1000));

    const staleSnap = await staleQuery.get();
    logger.info(`Tenant ${tenantDoc.id}: found ${staleSnap.size} stale drafts`);

    // In production, batch-delete or archive these
  }

  logger.info("Daily cleanup complete");
});
