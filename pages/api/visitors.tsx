import	Redis	from	'ioredis';
import {Response} from 'express';

const	redis = new Redis(process.env.REDIS_URL);

export async function incVisitors(): Promise<number> {
	const visitors = await redis.incr('counter');
	return visitors;
}

export default async function handler(res: Response): Promise<void> {
	const visitors = await redis.incr('counter');
	res.status(200).send(visitors);
	return;
}
