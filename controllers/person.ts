//person controller
import { Request, Response } from 'express' 
const mongoose = require('mongoose');
const modelUser = require('../models/person'); 

//get All Person 
const getAllPerson = async (req: Request, res: Response) => {

    try{
        const person = await modelUser.find();
        if(person){
            res.status(200).json(person);
        }
        else 
        {
            res.status(404).json({message: 'No person found'});
        }
    }
   
    catch(err){
        res.status(500).json(err);
    }
}

//get one person
async function getOnePerson (req: Request, res: Response) {

    const id = req.params.id;
    const person = await modelUser.findById(id);
    res.status(200).json(person);
}

//create new user person
  async function createPerson (req: Request, res: Response){
    const person = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday,
        city: req.body.city,
        state: req.body.state
    }
    try{
        
        const newPerson = await modelUser.collection.insertOne(person);
        res.status(201).json(newPerson);
        if(newPerson){
            console.log("Person created");
        }
        else{
            res.status(400).json('unable to create person');
            console.log("Person not created");
        }
   }
   catch(error){
    console.log('error: ' + error);
    res.status(500).json(error);
      }
  }


//update person 
async function updatePerson (req: Request, res: Response) {
    const id = req.params.id;
    const person = await modelUser.findByIdAndUpdate(id);
    res.status(200).json(person);


}

//delete person
async function deletePerson (req: Request, res: Response) {
    const id = req.params.id;
    const person = await modelUser.findByIdAndDelete(id);
    res.status(200).json(person);
}   

module.exports = {

    getAllPerson,
    getOnePerson,
    createPerson,
    updatePerson,
    deletePerson
}