import User from "../model/User";

type userPayload = {
  name: string;
  email: string;
  password?: string;
  role?: "admin" | "user";
};

export const getAllUsertypeservice = async (limit: number, skip: number) => {
  return await User.find().skip(skip).limit(limit);
};

export const getAllAdminservice = async (limit: number, skip: number) => {
  return await User.find({ role: "admin" }).skip(skip).limit(limit);
};

export const getAllUserservice = async (limit: number, skip: number) => {
  return await User.find({ role: "user" }).skip(skip).limit(limit);
};

export const addUserservice = async (payload: userPayload) => {
  return await User.create(payload);
};

export const removeUserservice = async (id: string) => {
  return await User.findByIdAndDelete(id);
};

export const updateUserservice = async (id: string, payload: userPayload) => {
  return await User.findByIdAndUpdate(id, payload);
};

export const getOneUserservice = async (id: string) => {
  return await User.findById(id);
};