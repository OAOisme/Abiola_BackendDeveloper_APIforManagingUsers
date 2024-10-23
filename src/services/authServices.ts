import User from "../model/User";

export const findAdminService = async (email: string) => {
  return await User.findOne({ email, role: "admin" }).select("+password");
};
