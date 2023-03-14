import mongoose, { Connection } from 'mongoose'
import { ConnectOptions } from 'mongoose'

interface MyConnectOptions extends ConnectOptions {
    useNewUrlParser?: boolean
}

mongoose.set('strictQuery', true)

export const connectMongoose = async (): Promise<Connection> => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI ?? '', {
            dbName: 'motormingledb',
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

export default connectMongoose
