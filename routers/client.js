import express from "express";
// Imported "getCustomers"from "controllers"
import { getProducts, getCustomers } from "../controllers/client.js";

const router = express.Router();
router.get("/products", getProducts);
// Adding route for "Customer" Page
router.get("/customers", getCustomers);

export default router;
