/**
 * Approved case studies for the /work page and the homepage "Receipts" section.
 *
 * SINGLE SOURCE OF TRUTH. Per .clinerules (Part A), portfolio and case-study
 * copy may use ONLY projects and facts Jason confirms in writing in
 * `docs/approved-claims.md`. Nothing is approved yet, so this list is
 * intentionally empty. Add entries here only after they are recorded in
 * `docs/approved-claims.md` with a source and date.
 */
export type CaseStudy = {
  /** Client or project name — must be an approved claim. */
  title: string;
  /** Short category line, e.g. "Website · Order requests". */
  kind: string;
  /** Absolute path to a screenshot under /public. */
  image: string;
  /** Alt text describing the screenshot. */
  alt: string;
  /** The business problem the project solved (approved wording). */
  problem: string;
  /** What was built / the outcome (approved wording). */
  fix: string;
  /** Optional live URL, only when approved. */
  href?: string;
  /** Optional label for the live link. */
  hrefLabel?: string;
};

export const CASE_STUDIES: CaseStudy[] = [];
