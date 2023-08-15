import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";

export const getProducts = async (req, res) => {
  try {
    // Firstly We are grabbing all the "Products" from database using the find() query
    const products = await Product.find();
    //! Then we are fetching all the productStats using the "productId" which is similarly to _id(Product)
    const productsWithStats = await Promise.all(
      /* 
      products.map iterate each products lets take one object
      example:    {
                    _id: "63701d24f03239c72c00018e",
                    name: "Port Beckley",
                    price: 311.71,
                    description: "Revision of Nonaut Sub in Mouth/Throat, Via Opening",
                    category: "clothing",
                    rating: 1.15,
                    supply: 1320,
                }
      
     !The above object will be stored in "productPara"

     !then we are fetching all the "ProductStat" from database using the query "find( using the Id "ProductId" which is equal to "productPara_id")"
      */
      products.map(async (productPara) => {
        // Finding the document (in iteration) using its Id which is equal to "productPara" Id
        const stat = await ProductStat.find({
          //? it will find the document on the basis of Id check this for more clarification D:\My Files\0. Web Development Bootcamp\Mongo Db\rest-api\src\routers\get.js
          productId: productPara._id,
        });
        return {
          ...productPara._doc,
          stat,
          //! This will return a new object and it will merge the productPara object and stat like this you can check the result using the url "http://localhost:5001/client/products" as well
          /* 
                 {
                    "_id": "63701d24f03239c72c00018e",
                    "name": "Port Beckley",
                    "price": 311.71,
                    "description": "Revision of Nonaut Sub in Mouth/Throat, Via Opening",
                    "category": "clothing",
                    "rating": 1.15,
                    "supply": 1320,
                    "__v": 0,
                    "createdAt": "2023-08-14T16:14:14.240Z",
                    "updatedAt": "2023-08-14T16:14:14.240Z",
                    "stat": [
                    {
                    "_id": "6371259df03239e680000035",
                    "productId": "63701d24f03239c72c00018e",
                    "yearlySalesTotal": 7152,
                    "yearlyTotalSoldUnits": 1414,
                    "monthlyData": [
                    {
                    "month": "january",
                    "totalSales": 574,
                    "totalUnits": 93,
                    "_id": "64da52d6a923924d5ed85148"
                    },
                    {
                    "month": "february",
                    "totalSales": 290,
                    "totalUnits": 337,
                    "_id": "64da52d6a923924d5ed85149"
                    },
                    {
                    "month": "march",
                    "totalSales": 947,
                    "totalUnits": 182,
                    "_id": "64da52d6a923924d5ed8514a"
                    },
                    {
                    "month": "april",
                    "totalSales": 774,
                    "totalUnits": 490,
                    "_id": "64da52d6a923924d5ed8514b"
                    },
                    {
                    "month": "may",
                    "totalSales": 707,
                    "totalUnits": 320,
                    "_id": "64da52d6a923924d5ed8514c"
                    },
                    {
                    "month": "june",
                    "totalSales": 468,
                    "totalUnits": 3,
                    "_id": "64da52d6a923924d5ed8514d"
                    },
                    {
                    "month": "july",
                    "totalSales": 346,
                    "totalUnits": 15,
                    "_id": "64da52d6a923924d5ed8514e"
                    },
                    {
                    "month": "august",
                    "totalSales": 838,
                    "totalUnits": 456,
                    "_id": "64da52d6a923924d5ed8514f"
                    },
                    {
                    "month": "september",
                    "totalSales": 193,
                    "totalUnits": 341,
                    "_id": "64da52d6a923924d5ed85150"
                    },
                    {
                    "month": "october",
                    "totalSales": 76,
                    "totalUnits": 231,
                    "_id": "64da52d6a923924d5ed85151"
                    },
                    {
                    "month": "november",
                    "totalSales": 305,
                    "totalUnits": 219,
                    "_id": "64da52d6a923924d5ed85152"
                    },
                    {
                    "month": "december",
                    "totalSales": 90,
                    "totalUnits": 1,
                    "_id": "64da52d6a923924d5ed85153"
                    }
                    ],
                    "__v": 0,
                    "createdAt": "2023-08-14T16:14:14.245Z",
                    "updatedAt": "2023-08-14T16:14:14.245Z"
                    }
                    ]
                    },
          */
        };
      })
    );
    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
