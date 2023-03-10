import mongoose, { Model } from 'mongoose'

interface car {
    carMake: string
    carModel: string
    engineSize: string
    color: string
    year: string
    price: string
}

const Car: Model<car> = mongoose.model<car>(
    'car',
    new mongoose.Schema(
        {
            carMake: String,
            carModel: String,
            engineSize: String,
            color: String,
            year: String,
            price: String,
        },
        { timestamps: true }
    )
)

export default Car
