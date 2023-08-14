import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    // This syntax directly accesses the id property of the req.params object and assigns its value to the id variable.
    // const id = req.params.id;

    // or

    // This syntax uses object destructuring to directly extract the "id" property from the req.params object.
    //? reference D:\My Files\0. Web Development Bootcamp\Mongo Db\rest-api\src\routers\get.js
    const { id } = req.params;
    const user = await User.findById(id);
    // http://localhost:5001/general/user/63701cc1f03239b7f700000e  //! it will return the response in JSON json.(user). It will fetch the data from MongoAtlas so don't forget to connect the server to database before using this url.
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
