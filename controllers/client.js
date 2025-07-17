import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

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

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");

    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Transaction page

export const getTransactions = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    //? ref D:\My Files\0. Web Development Bootcamp\Mern Projects\Admin Dashboard Green\Docs\Sorting function in Transaction Page\sortandfield.png

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        //!Using square brackets [sortParsed.field] is a way to dynamically set the property name of an object in JavaScript. It allows you to use the value of a variable or an expression as the property name. This is particularly useful when you want to create object properties with names that are not known in advance, but rather are determined at runtime.

        //!sortParsed.sort === "asc" ? 1 : -1: This is a ternary conditional expression. If sortParsed.sort is equal to "asc", it will evaluate to 1, indicating ascending order. If it's not equal to "asc", it will evaluate to -1, indicating descending order.

        // sort should look like this: { "field": "userId", "sort": "desc"}

        // Suppose we have { "field": "userId", "sort": "desc"} in "sortParsed" in Json format we are converting it into "object" using parse method
        //! then as we know with the help of square brackets we can set the key "value" as Key. here we have "userId" as value so it become the primary key so the output will look like this
        /* 
        ? ref arrayandobject in js Bootcamp file for [sortParsed.field] why its in square brackets !important

        {
          If sortParsed.sort contains "asc" it will return "1" or if it's not it will return "-1"
          "userId": 1
        }
        */
        //? Check the doc file about how the sortParsed.field and sortParse.sort get the values "D:\My Files\0. Web Development Bootcamp\Mern Projects\Admin Dashboard Green\sorting.txt"
        [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1, // In MUI if we set the userId = 1 it will arrange the table in ascending format and if it returns "-1" it will arrange in decending format
      };

      return sortFormatted;
    };
    // this line of code essentially generates the sortFormatted object with a sorting configuration if the sort query parameter exists, and with an empty object if it doesn't. It ensures that the generateSort() function is only called when the sort parameter is provided.
    //! Basically if "sort" contains any value then it returns "true" and if contains "null", undefined then it returns "false" and the "sorting function" will not execute
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
