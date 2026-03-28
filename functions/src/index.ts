// Cloud Functions entry point — re-export all function groups

export { onUserCreated } from "./auth/onCreate";
export { updateRecord } from "./callable/updateRecord";
export { submitContactForm } from "./callable/submitContactForm";
export { onRecordStatusChange } from "./triggers/auditLog";
export { dailyCleanup } from "./jobs/cleanup";
