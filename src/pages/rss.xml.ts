import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export const get = async () => {
	const posts = await getCollection("blog", ({ data }) => {
		return !data.draft && data.publishDate < new Date();
	});

	// Sort content entries by publication date
	posts.sort(
		(a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
	);

	return rss({
		title: `Lockstrom`,
		description: "Lockstrom - Software Development Agency",
		site: import.meta.env.SITE,

		items: posts.map((post) => ({
			link: post.slug,
			title: post.data.title,
			description: post.data.snippet,
			pubDate: post.data.publishDate,
		})),
	});
};
