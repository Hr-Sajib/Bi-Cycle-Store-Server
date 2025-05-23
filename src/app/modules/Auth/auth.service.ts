import config from "../../../config";
import AppError from "../../errors/AppError";
import { UserModel } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken, verifyToken } from "./auth.utils";
import httpStatus from 'http-status';
import bcrypt from "bcrypt"; // Make sure bcrypt is installed

const loginUserIntoDB = async (payload: TLoginUser) => {
  const user = await UserModel.isUserExistsByEmail(payload.email);
  if (!user) {
    throw new AppError(401,"User not found"); 
  }

  if(user?.status == "deactivated"){
    throw new AppError(401, "User Deactivated by Admin!");
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid) {
    throw new AppError(401, "Invalid password");
  }

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken
  };
};



const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { userEmail, iat } = decoded;


  // checking if the user is exist
  const user = await UserModel.isUserExistsByEmail(userEmail);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }


  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};



export const authServices = {
  loginUserIntoDB,
  refreshToken,
};