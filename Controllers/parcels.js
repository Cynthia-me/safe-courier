import Joi from 'joi';
import { v4 as uuidv4 } from 'uuid';

const parcels = []  

//retrieving all the parcel delivery orders
export const getParcels = (req,res)=>{
    res.send(parcels)
}

//creating or adding a parcel delivery order
export const createParcel = (req,res)=>{
    const schema = Joi.object({
                parcelItem: Joi.string().required(),
                parcelWeight: Joi.string().required(),
                From : Joi.string().required(),
                To:Joi.string().required()
            });
            const result = schema.validate(req.body);
            if(result.error){
                res.status(400).send(result.error.details[0].message);
                return;
            };
        
            const parcel = {
                parcelItem : req.body.parcelItem,
                parcelWeight : req.body.parcelWeight,
                From : req.body.From,
                To : req.body.To
            };

            const parcelId = uuidv4();
            const parcelWithId = {
                ...parcel,
                parcelid : parcelId
            }

            parcels.push(parcelWithId);
            res.send("Another parcel has been added");
}

//retrieving a specific parcel delivery order
export const getSpecificParcel = (req,res)=>{
    const specificParcel = parcels.find(par => par.parcelid === req.params.parcelid);
    if(!specificParcel) 
    return res.status(404).send('Parcel ID not found');
    res.json(specificParcel);

}

//deleting a specific parcel delivery order
export const deleteSpecificParcel = (req,res)=>{
    const parcel = parcels.find(par => par.parcelid === req.params.parcelid);
    if(!parcel) 
    return res.status(404).send('Parcel ID not found');

    const index = parcels.indexOf(parcel);
    parcels.splice(index,1);

    res.json({parcel,message : "parcel deleted"});
}

//updating a detail of the parcel delivery order or the entire order
export const patchSpecificParcel = (req,res)=>{
    const {parcelItem,parcelWeight,From,To} = req.body;
    const updatedParcel = parcels.find((par)=>par.parcelid === req.params.parcelid);

    if(parcelItem)
    updatedParcel.parcelItem = parcelItem;
    if(parcelWeight)
    updatedParcel.parcelWeight = parcelWeight;
    if(From)
    updatedParcel.From = From;
    if(To)
    updatedParcel.To = To;

    res.send("Updated parcel");
}