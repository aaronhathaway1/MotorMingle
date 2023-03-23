//person controller
import { Request, Response } from 'express'
require('mongoose')
const modelUser = require('../models/person')

//get All Person
const getAllPerson = async (req: Request, res: Response) => {
    try {
        const person = await modelUser.find()
        if (person) {
            res.status(200).json(person)
        } else {
            res.status(404).json({ message: 'No person found' })
        }
    } catch (err) {
        res.status(500).json(err)
        return;
    }
}

//get one person
async function getOnePerson(req: Request, res: Response) {
    try{
        const id = req.params.id
        const person = await modelUser.findById(id)
        if (person) {
            res.status(200).json(person)
        } else {
            res.status(404).json({ message: 'No person found' })
        }
    }
    catch(err){
        res.status(500).json({message:"error occured while fetching person"})
        return;
    }
    
    
}
 
 
//create new user person
/*
async function createPerson(req: Request, res: Response) {
    
    if(req.body.email > 1){
        for(let i in req.body.email){
            if(req.body.email[i] > 1){
                res.status(400).json({ message: 'Email already exists' })
                return
            }
            else{
                req.body.email[i] = req.body.email[i].toLowerCase()
            }
        }
       
    }
    const person = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday,
        city: req.body.city,
        state: req.body.state,
    }
    try {
        const newPerson = await modelUser.collection.insertOne(person)
        res.status(201).json(newPerson)
        if (newPerson) {
        } else {
            res.status(400).json('unable to create person')
        }
    } catch (error) {
        res.status(500).json(error)
    }
}
*/
 

//update person
async function updatePerson(req: Request, res: Response) {

    try{
       
        const personinfo = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            birthday: req.body.birthday,
            city: req.body.city,
            state: req.body.state,
        } 

        const id = req.params.id
        const person = await modelUser.findByIdAndUpdate(id, personinfo) 
        //const updatedPerson = await modelUser.findByIdAndUpdate(id, person, { new: true })
        
        if (person) {
            res.status(200).json({message: "Person updated successfully"})
        } else {
            res.status(400).json('Unable to update person.')
        }
    }
    catch(err){
        res.status(500).json(err)
        res.send({message: 'Issue person not found.'})
        return;
    }
   
   /* const id = req.params.id
    const person = await modelUser.findByIdAndUpdate(id)
    res.status(200).json(person)
    */
}

//delete person
async function deletePerson(req: Request, res: Response) {
    
    try{
        const id = req.params.id
        const person = await modelUser.findByIdAndDelete(id)
        
        if(person){
            res.status(200).json({message: 'person deleted successfully'})
        }else{
            res.status(404).json({message: 'person not found'})
        }
    }
    catch(err){        
        res.status(500).json({message: "Error in deleting person"})
        return;
    }
}

module.exports = {
    getAllPerson,
    getOnePerson,
    //createPerson,
    updatePerson,
    deletePerson,
}
