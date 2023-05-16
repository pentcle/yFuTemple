const JSONContent = {
	'name': 'YFU',
	'description': 'Artwork Sourced from yFu, the Comic.',
	'image': 'https://yfu.vercel.app/artwork.png',
	'animation_url': 'https://yfu.vercel.app/artwork.mp4',
	'external_url': 'https://yfu.vercel.app',
	'attributes': []
};

export default async function handler(_: any, res: any): Promise<void> {
	res.status(200).json(JSONContent);
}
