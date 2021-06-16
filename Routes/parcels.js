import express from 'express';
const router = express.Router();


import {getParcels,createParcel,getSpecificParcel,deleteSpecificParcel,patchSpecificParcel} from "../Controllers/parcels.js";

router.get('/',getParcels)

router.post('/',createParcel);

router.get('/:parcelid',getSpecificParcel);

router.delete('/:parcelid', deleteSpecificParcel)

router.patch('/:parcelid',patchSpecificParcel)

export default router;