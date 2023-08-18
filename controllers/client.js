import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const productsWithStats = await Promise.all(
      products.map(async (productPara) => {
        const stat = await ProductStat.find({
          productId: productPara._id,
        });
        return {
          ...productPara._doc,
          stat,
        };
      })
    );
    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// For Customer Page

// exporting "getCustomers" for routers and also we don't need to insert the 'User' data again in "index.js" because we have already insert the "User" data into the database when we are working for user login feature

export const getCustomers = async (req, res) => {
  //http://localhost:5001/client/customers
  try {
    //! Using the find method we are fetching all the document from "database" which have "role: "user" in it and also we are excluding the "password" field from the document
    // And also we are using the same Model Schema "User" for customer page as well
    const customers = await User.find({ role: "user" }).select("-password");

    //! Password field is excluded from the document "select("-password")
    /* {
        "_id": "63701cc1f032398675000124",
        "name": "Elsi",
        "email": "ehazeldeneo@ezinearticles.com",
        "city": "Vũng Tàu",
        "state": null,
        "country": "VN",
        "occupation": "Chemical Engineer",
        "phoneNumber": "5725023513",
        "transactions": [],
        "role": "user",
        "__v": 0,
        "createdAt": "2023-08-09T16:16:26.380Z",
        "updatedAt": "2023-08-09T16:16:26.380Z"
} */
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
