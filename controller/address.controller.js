import Address from "../model/address.model.js";
import User from "../model/user.mode.js";

export const getAllAddressController = async (req, res) => {
  try {
    const address = await Address.find().populate("author");
    return res.status(200).json({
      address,
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
      error: true,
      success: false,
    });
  }
};

export const createAddressController = async (req, res) => {
  try {
    const { address_line, city, state, pincode, country, mobile } = req.body;
    const address = new Address({
      address_line,
      city,
      state,
      pincode,
      country,
      mobile,
      author: res.user.id,
    });
    const result = await address.save();
    await User.findOneAndUpdate(
      { _id: res.user.id },
      {
        $push: {
          address_details: result._id,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      result,
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
      error: true,
      success: false,
    });
  }
};
