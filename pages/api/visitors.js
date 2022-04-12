import	Redis	from	'ioredis';
const	redis = new Redis(process.env.REDIS_URL);

export async function incVisitors() {
	const visitors = await redis.incr('counter');
	return visitors;
}

export default async function handler(req, res) {
	const visitors = await redis.incr('counter');
	return res.status(200).send(visitors);
}
