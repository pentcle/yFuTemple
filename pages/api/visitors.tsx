import	Redis	from	'ioredis';

const	redis = new Redis(process.env.REDIS_URL as string);

export async function incVisitors(): Promise<number> {
	const visitors = await redis.incr('counter');
	return visitors;
}

export default async function handler(req: any, res: any): Promise<void> {
	const visitors = await redis.incr('counter');
	res.status(200).send(visitors);
	return;
}
