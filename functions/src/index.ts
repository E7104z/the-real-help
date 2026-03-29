// Cloud Functions entry point — re-export all function groups

export { onUserCreated } from "./auth/onCreate";
export { updateRecord } from "./callable/updateRecord";
export { submitContactForm } from "./callable/submitContactForm";
export { createClient } from "./callable/createClient";
export { onRecordStatusChange } from "./triggers/auditLog";
export { onInviteRequest } from "./triggers/onInviteRequest";
export { dailyCleanup } from "./jobs/cleanup";
