import express from "express";
import { addSchool, listSchool } from "../controllers/school.controllers.js";


const schoolRouter = express.Router()


schoolRouter.post('/addSchool', addSchool)
schoolRouter.get('/listSchools', listSchool)


export default schoolRouter