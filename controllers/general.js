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
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
