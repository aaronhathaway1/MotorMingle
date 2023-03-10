import mongoose, { Connection } from 'mongoose'
import { ConnectOptions } from 'mongoose'

interface MyConnectOptions extends ConnectOptions {
    useNewUrlParser?: boolean
}

mongoose.set('strictQuery', true)

export const getDb = async (): Promise<Connection> => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI ?? '', {
            dbName: 'steel_horses',
            connectTimeoutMS: 2000,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as MyConnectOptions);

        console.log(`MongoDB Connected: ${conn.connection.host}`)
        return conn.connection
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

export default getDb
