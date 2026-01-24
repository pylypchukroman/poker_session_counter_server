import { ctrlWrapper } from '../helpers/ctrlWrapper';
import { User } from '../models/user';
import { HttpError } from '../helpers/HttpError';
import * as bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  const { email, password }: {email: string, password: string} = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `User with email ${email} already exist`);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const { email: userEmail, name } = await User.create({ ...req.body, password: hashedPassword });
  res.status(201).json({ userEmail, name });
}

export const login = async (req, res) => {
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
  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '12h' });
  const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
  await User.findByIdAndUpdate(user.id, { token: accessToken });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false, // для dev: false, для prod: true
    sameSite: "strict",
    maxAge: 2 * 60 * 1000, // 2 хвилини
  });

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
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw HttpError(401, "Not authorized");
  }

  try {
    const { id } = jwt.verify(refreshToken, process.env.JWT_SECRET);

    const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "12h" });
    const newRefreshToken = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    await User.findByIdAndUpdate(id, { token: accessToken });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 5 * 60 * 60 * 1000,
    });

    res.json({
      tokens: {
        accessToken,
      },
    });
  } catch (err) {
    throw HttpError(401, "Not authorized");
  }
};


export const authController = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  // current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  refreshToken: ctrlWrapper(refreshToken)
}
