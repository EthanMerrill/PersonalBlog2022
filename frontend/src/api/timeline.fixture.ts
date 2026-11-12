import type {TimelineItem} from "../types/TimelineItem";

// Local fallback used when NEXT_PUBLIC_POCKETBASE_URL is unset. Newest first.
// Dates for legacy entries that had none in Firestore are approximate.
export const timelineFixture: TimelineItem[] = [
	{
		id: "fx-pm",
		kind: "experience",
		title: "Project Manager",
		subtitle: "@Captech for top 5 Energy Utility Company",
		blurb: "Led the agile design and development of an augmented reality application for a top 5 energy utility company.",
		startDate: "2022-06-01T07:00:00.328Z",
		extLink: "https://www.captechconsulting.com/client-stories/augmented-reality-app-empowers-utility-cu",
		tech: ["AR", "Agile"],
	},
	{
		id: "fx-bank-dev",
		kind: "experience",
		title: "Developer",
		subtitle: "@CapTech for a Midsize Bank",
		blurb: "Created and implemented two software solutions to streamline commercial account maintenance.",
		startDate: "2023-04-12T04:00:00.531Z",
	},
	{
		id: "fx-recipes",
		kind: "project",
		title: "The Recipes Only",
		subtitle: "ChatGPT Generated Recipes",
		blurb: "An alternative to recipe sites crammed with useless stories and ads.",
		startDate: "2023-01-02T21:03:07.360Z",
		extLink: "https://therecipesonly.com",
		tech: ["Next.js", "ChatGPT", "Firebase"],
	},
	{
		id: "fx-dama",
		kind: "experience",
		title: "Developer",
		subtitle: "@CapTech for Richmond Data Management Association",
		blurb: "Created React frontend for the Richmond Data Management Association.",
		startDate: "2023-01-02T08:00:00.164Z",
		extLink: "https://damarva.org/",
		tech: ["React"],
	},
	{
		id: "fx-nav",
		kind: "project",
		title: "Marine Navigation Rules",
		subtitle: "A site built to teach sailors and other Mariners basic rules of the road",
		blurb: "Users orient two sailboats on the page using a drag, drop, and rotate interface.",
		startDate: "2022-09-01T07:00:00.000Z",
		extLink: "https://ethanmerrill.github.io/navigation-rules/",
		repoLink: "https://github.com/EthanMerrill/navigation-rules",
	},
	{
		id: "fx-jamsort",
		kind: "project",
		title: "Jamsort",
		subtitle: "An app to sort Spotify playlists",
		blurb: "Sort the songs in your Spotify playlists using JamSort.",
		startDate: "2022-05-01T07:00:00.000Z",
		extLink: "https://ethanmerrill.github.io/spotify-api-react-app/index",
		tech: ["React", "Spotify API"],
	},
];
