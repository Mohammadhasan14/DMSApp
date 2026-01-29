import api from "./api";

export const generateOTP = async (mobile: string) => {
  console.log("sending OTP to......", mobile);

  const res = await api.post("/generateOTP", {
    mobile_number: mobile,
  });

  console.log("OTP response.....", res.data);
  return res;
};

export const validateOTP = async (mobile: string, otp: string) => {
  console.log("verifying OTP......", { mobile, otp });

  const res = await api.post("/validateOTP", {
    mobile_number: mobile,
    otp,
  });

  console.log("validate OTP response.....", res.data);
  return res;
};
