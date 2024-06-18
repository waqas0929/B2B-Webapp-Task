import redis from 'redis'

const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379,
    password:'yourpassword'
})

redisClient.on('error', function (error) {
    console.error(`Redis error: ${error}`)
})

export default redisClient