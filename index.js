import express from "express"; // Importing express
// import bodyParser from "body-parser";
import mongoose from "mongoose";

//? Follow these links to understand cors in details
// https://youtu.be/Y9nyPlVrfvE?t=199
// https://youtu.be/OX-9oOcPDfE?t=98
import cors from "cors"; // It solves the error which browser gives when we try to connect between two different urls UI and API
import dotenv from "dotenv";
//? Follow this link to understand more about helmet https://www.youtube.com/watch?v=cmT7i3Mty9c
import helmet from "helmet"; // It hides the header information
//? Follow this link to understand morgan in depth https://www.youtube.com/watch?v=QUbksAVFe8g
import morgan from "morgan"; // It gives all the information about http requests in terminal

// Routes
import clientRoutes from "./routers/client.js";
import generalRoutes from "./routers/general.js";
import managementRoutes from "./routers/management.js";
import salesRoutes from "./routers/sales.js";

// User Data Imports
// Importing Model
import User from "./models/User.js";
// Here we have a file where we place fake json data and in that collection of data we are extracting only "dataUser" from the collection so that we can inject it into mongo atlas
import { dataUser } from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express(); // Storing express methods in 'app'variable
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginEmbedderPolicy({ policy: "credentialless" }));
app.use(morgan("common")); // :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

/* ROUTES */
//! when you run your application and send requests to the specified routes, the paths will be automatically prefixed with /client due to the way the router is mounted: like "/client/create or /client/update or /client/delete" so basically /client is a prefix or we say a base route and rest of path we'll define in "clientRoutes" file
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE */
const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(function () {
    console.log("connection is successfull..");
    // With the help of Models we are inject the data into mongo Atlas using "insertMany" query for more clarification check the below path
    //? Reference D:\My Files\0. Web Development Bootcamp\Mongo Db\mongoose\16.inBuilt-validator.js
    // User.insertMany(dataUser);
  })
  .catch((err) => {
    console.log(err, "connection failed");
  });

app.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
});
