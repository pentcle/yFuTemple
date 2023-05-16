export default async function handler(_: any, res: any): Promise<void> {
	res.writeHead(302, {Location: '/artwork.mp4'});
	res.end();
}
