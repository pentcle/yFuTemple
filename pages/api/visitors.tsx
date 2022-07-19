import	Redis	from	'ioredis';
import { NextApiResponse } from 'next';

const	redis = new Redis(process.env.REDIS_URL);

export async function incVisitors(): Promise<number> {
	const visitors = await redis.incr('counter');
	return visitors;
}

export default async function handler(res: NextApiResponse): Promise<void> {
	const visitors = await redis.incr('counter');
	res.status(200).send(visitors);
	return;
}
