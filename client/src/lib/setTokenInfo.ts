import axios from "axios";
import cookie from "js-cookie";
const setAccessToken = (tokenValue: string) => {
  console.log("tokenValue from setTokenInfo", tokenValue);
  cookie.set("accessToken", tokenValue, {
    sameSite: "strict",
    secure: true,
    expires: 30 * 60 * 60 * 1000,
    path: "/",
  });
};
const setRefreshToken = (tokenValue: string) => {
  console.log("tokenValue from setRefreshToken", tokenValue);
  cookie.set("refreshToken", tokenValue, {
    sameSite: "strict",
    secure: true,
    expires: 30 * 24 * 60 * 60 * 1000,
    path: "/",
  });
};

const clearTokenInfo = async () => {
  await axios.post("/api/cookies/remove");
};

const clearAccessToken = () => {
  cookie.remove("accessToken");
};

export { setAccessToken, setRefreshToken, clearTokenInfo, clearAccessToken };
