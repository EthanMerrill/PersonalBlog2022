import App from "../src/App";
import {loadTimelineItems} from "../src/api/timeline";

// Server component: runs at build time (output: "export"), so the timeline
// content is baked into the static HTML.
export default async function Page() {
	const items = await loadTimelineItems();
	return <App items={items} />;
}
