import { ctrlWrapper } from '../helpers/ctrlWrapper.ts';
import { User } from '../models/user.ts';
import { HttpError } from '../helpers/HttpError.ts';
import * as bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const register = async (req: any, res: any) => {
  const { email, password }: {email: string, password: string} = req.body;
  const user = await User.findOne({ email });
  if (user) {
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
  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '5h' });
  const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '10h' });
  await User.findByIdAndUpdate(user. id, { accessToken })
  res.json({
    user: {
      email: user.email,
      name: user.name
    },
    tokens: {
      accessToken,
      refreshToken
    }
  });
};

// export const current = async (req, res) => {
//   const { email, name } = req.user;
//   res.json({ email, name });
// };

export const logout = async (req,res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: null });
  res.json({message: "Logout success"})
}
export const refreshToken = async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw HttpError(401, 'Not authorized');
  }

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) {
    throw HttpError(401, 'Not authorized');
  }
  try {
    const { id } = await jwt.verify(token, process.env.JWT_SECRET);
    const accessToken = jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '5h' });
    const refreshToken = jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '10h' });
    await User.findByIdAndUpdate(id, { token: accessToken });
    res.json({
      accessToken,
      refreshToken
    })
  } catch {
    throw HttpError(401, 'Not authorized');
  }
}

export const authController = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  // current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  refreshToken: ctrlWrapper(refreshToken)
}
