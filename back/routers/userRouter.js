import express from "express";
import { data } from "../data.js";
import bcrypt from "bcryptjs";
import User from "../models/userModels.js";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils.js";

data;
const userRouter = express.Router();
userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await User.remove({});
    const createUsers = await User.insertMany(data.users);
    res.send({ createUsers });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res
      .status(401)
      .send({ message: "ایمیل یا رمزعبور وارد شده صحیح نمی باشد." });
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      fullName: createdUser.fullName,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);

export default userRouter;
