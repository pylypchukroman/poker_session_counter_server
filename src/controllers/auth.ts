import { ctrlWrapper } from '../helpers/ctrlWrapper.ts';
import { User } from '../models/user.ts';
import { HttpError } from '../helpers/HttpError.ts';
import * as bcrypt from "bcrypt";

export const register = async (req: any, res: any) => {
  const { email, password }: any = req.body;
  const isExist = await User.findOne({ email });
  if (isExist) {
    throw new HttpError(409, `User with email ${email} already exist`);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await User.create({ ...req.body, password: hashedPassword });
  res.status(201).json(createdUser);
}

export const authController = {
  register: ctrlWrapper(register),
}
