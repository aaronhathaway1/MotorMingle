import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
// import { carValidation } from './validation';
import  Car from '../models/cars';
import connectMongoose from "../db/connect";

// const apiKey = 'KZ9u3ZO4cT5W3nf6HnZc17aYwskqCymnVpqSqo32JJYx3qFqXsCOlwxZXKnSbHDK';

export const getData = async (req: Request, res: Response): Promise<void> => {
    try {
        const connection = await connectMongoose();
        const result = await connection.collection('cars').find();
        const lists = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const getSingleData = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = new ObjectId(req.params.id);
        const connection = await connectMongoose();
        const result =  await connection.collection('cars').find({ _id: userId });
        const lists = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// create a new car
export const createNewCar = async (req: Request, res: Response): Promise<void> => {
    try {
        const car = {
            carMake: req.body.carMake,
            carModel: req.body.carModel,
            engineSize: req.body.engineSize,
            color: req.body.color,
            year: req.body.year,
            price: req.body.price,
        };
        const connection = await connectMongoose();
        const response = await connection.collection('cars').insertOne(car);
        if (response.acknowledged) {
            res.status(201).json(response);
            console.log('Car added successfully');
        } else {
            res.status(500).json({ message:'Some error occurred while adding the car.'});
            console.log('Car not added');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//update car by id
export const updateCar = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.body) {
            res.status(400).send('Data to update can not be empty!');
        }
        const userId = new ObjectId(req.params.id);
        const car = {
            carMake: req.body.carMake,
            carModel: req.body.carModel,
            engineSize: req.body.engineSize,
            color: req.body.color,
            year: req.body.year,
            price: req.body.price,
        };
        const db = connectMongoose();
        if (!db) {
            throw new Error('Database not available');
        }
        const connection = await connectMongoose();
        const response = await connection.collection('cars').replaceOne({ _id: userId }, car);
        console.log(response);
        if (response.modifiedCount ?? 0 > 0) {
            res.status(204).send('Car updated successfully');
        } else {
            res.status(500).json({ message: 'Some error occurred while updating the car in Hot-cars.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



// delete car by id
export const deleteCar = async (req: Request, res: Response): Promise<void> => {
    try {
        const connection = await connectMongoose();
        const userId = new ObjectId(req.params.id);
        const response = await connection.collection('cars').deleteOne({ _id: userId });
        console.log(response);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: 'Some error occurred while deleting the car.'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};