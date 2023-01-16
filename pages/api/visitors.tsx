import	Redis	from	'ioredis';

const	redis = new Redis(process.env.REDIS_URL as string);

export async function incVisitors(): Promise<number> {
	const visitors = await redis.incr('counter');
	return visitors;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(_: any, res: any): Promise<void> {
	const visitors = await redis.incr('counter');
	res.status(200).send(visitors);
	return;
}
