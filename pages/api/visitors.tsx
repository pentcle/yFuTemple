import	Redis	from	'ioredis';

const	redis = new Redis(process.env.REDIS_URL as string);

export async function incVisitors(): Promise<number> {
	const visitors = await redis.incr('counter');
	return visitors;
}

export default async function handler(): Promise<void> {
	const visitors = await redis.incr('counter');
	console.log(visitors);
	// res.status(200).send(visitors);
	return;
}
