import { ctrlWrapper } from '../helpers/ctrlWrapper.ts';
import { User } from '../models/user.ts';
import { HttpError } from '../helpers/HttpError.ts';
import * as bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const register = async (req: any, res: any) => {
  const { email, password }: any = req.body;
  const isExist = await User.findOne({ email });
  if (isExist) {
    throw HttpError(409, `User with email ${email} already exist`);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const { email: userEmail, name } = await User.create({ ...req.body, password: hashedPassword });
  res.status(201).json({ userEmail, name });
}

export const login = async (req: any, res: any) => {
  const { email, password }: any = req.body;
  if (!email || !password) {
    throw HttpError(400, 'Email and password are required');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password wrong" );
  }
  const isPasswordSame = await bcrypt.compare(password, user.password);
  if (!isPasswordSame) {
    throw HttpError(401, "Email or password wrong" );
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
  res.json({
    user: {
      email: user.email,
      name: user.name
    },
    token
  });
};

export const authController = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login)
}
