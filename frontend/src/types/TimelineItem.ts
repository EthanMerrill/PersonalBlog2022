export type TimelineKind = "experience" | "project";
export interface TimelineItem {
  id: string;
  kind: TimelineKind;
  title: string;
  subtitle?: string;
  blurb?: string;
  startDate?: string; // ISO
  endDate?: string;   // ISO
  extLink?: string;
  repoLink?: string;
  imageUrl?: string;  // absolute, already resolved to the 800x0 thumb
  imageAlt?: string;
  tech?: string[];
}
