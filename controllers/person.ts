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
    updatePerson,
    deletePerson,
}
