const express = require("express");
const router = express.Router();
const db = require('../dbConfig');

const catchGet = (target) => ({error: `__CATCH__ Failed to retrieve ${target}` });
const catchPost = (target, location) => ({error: `__CATCH__ Failed to add ${target} to ${location}` });

router
    .route("/inventory")
        .get((req, res)=> {
            db('cars')
                .select('*')
                .then( cars => res.status(200).json(cars))
                .catch( ()=> status(404).json(catchGet("vehicle inventory.")) )
        })
        .post(newCarValidator, (req, res)=> {
            // WORkING -- BUT RETURNS A CATCH 
            const newCar = req.body;
            db('cars')
                .insert(newCar)
                .then( car => res.status(200).json({car}) )
                .catch( () => res.status(501).json(catchPost("car", "inventory")) )
        })
router
    .route("/inventory/:id")
        .get((req, res)=> {
            const {id} = req.params
            db('cars')
                .select('*')
                .where({id})
                .then( car => res.status(200).json(car))
                .catch( () => res.statusCode(404).json(catchGet("Car with given ID")))
        })
        .delete((req, res)=> {
            const {id} = req.params
            db('cars')
                .where({id})
                .del()
                .then( () => res.status(200).json({message: `${id} was removed.`}))
                .catch( () => res.status(501).json({error: `Failed to remove car with ${id}`}))
        })
        .put((req, res)=> {
            const {id} = req.params;
            newData = req.body;
            db('cars')
                .where({id})
                .update(newData)
                .then(() => res.status(200).json({message: `${newData} Posted`}))
                .catch( () => res.status(501).json({error: "Could not Update"}))
        })

// Middleware
function newCarValidator (req, res, next){
    const newCar = req.body;
    if(!newCar.Make){
        res.status(501).json({message:"Need the Make of the car."})
    }else if(!newCar.Model){
        res.status(501).json({message:"Need the Model of the car."})
    }else if(!newCar.Mileage){
        res.status(501).json({message:"Need the Mileage of the car."})
    }else if(!newCar.VIN){
        res.status(501).json({message:"Need the Vin of the Car"})
    }else{
        next();
    }
}

module.exports= router;