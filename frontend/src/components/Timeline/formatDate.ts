const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function fmt(iso: string): string | null {
	const d = new Date(iso);
	if (isNaN(d.getTime())) return null;
	return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** "Jun 2025 – Present" (no end date), "Apr 2022" (same month), "Jan 2022 – Mar 2023"; "" if no start date. */
export function formatDateRange(startDate?: string, endDate?: string): string {
	const start = startDate ? fmt(startDate) : null;
	if (!start) return "";
	const end = endDate ? fmt(endDate) : null;
	if (end) return end === start ? start : `${start} – ${end}`;
	return `${start} – Present`;
}
