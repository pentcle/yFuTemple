async function fetchGraphQL(query, preview = false) {
	return fetch(
		`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${
					preview
						? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
						: process.env.CONTENTFUL_ACCESS_TOKEN
				}`,
			},
			body: JSON.stringify({query}),
		}
	).then((response) => response.json());
}

function extractPostEntries(fetchResponse) {
	return fetchResponse?.data?.goddessGalleryCollection?.items;
}

export async function getPostsByID(id) {
	id = id.toLowerCase();
	const entries = await fetchGraphQL(`{
		goddessGalleryCollection(where: {id: "${id}"}) {
			items {
				tributeTitle
				mediasCollection {
					items {
						title
						description
						url
					}
				}
			}
		}
	}`);
	return extractPostEntries(entries);
}


export async function getAllPostsForHome() {
	const entries = await fetchGraphQL(`{
		goddessGalleryCollection(order: sys_publishedAt_ASC) {
		  	items {
				sys {
					id
				}
				id
				title
				description
				watermark {
			  		url
				}
				mainIllustration {
			  		url
				}
		  	}
		}
	}`);
	return extractPostEntries(entries);
}
