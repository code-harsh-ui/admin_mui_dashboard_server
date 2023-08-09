import express from "express";
// Here we are importing only "getUser" function from the module.
import { getUser } from "../controllers/general.js";

const router = express.Router();

// Base url (/general/user/:id) is defined in 'index.js' file in root folder
// "getUser" is a function which is defined in different file (controllers) where we are getting request and reponse from the url.
router.get("/user/:id", getUser);

export default router;
