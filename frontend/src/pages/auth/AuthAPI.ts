import axios, { AxiosInstance } from "axios";

// Retrieve token and token type from localStorage
const TOKEN_TYPE = localStorage.getItem("tokenType");
const ACCESS_TOKEN = localStorage.getItem("accessToken");

interface ResponseData {
  token: string;
  access: string;
}

// Function to create an instance of Axios with baseURL and headers
export const createAuthApi = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      // Set Authorization header with token and token type
      Authorization: `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
    },
  });

  return instance;
};

// Create instance of AuthAPI
const AuthAPI: AxiosInstance = createAuthApi("http://localhost:8082");

export const login = async ({
  memberId,
  memberPwd,
}: {
  memberId: string;
  memberPwd: string;
}): Promise<ResponseData> => {
  const data = { memberId, memberPwd };
  try {
    const response = await AuthAPI.post("/signin", data);
    const responseData: ResponseData = {
      token: response.headers["token"],
      access: response.headers["access"],
    };

    // 서버 응답 데이터 확인
    console.log("Server Response Data:", responseData);

    // 토큰이 올바르게 추출되었는지 확인
    if (!responseData.token || !responseData.access) {
      throw new Error("Invalid response data received from server");
    }

    return responseData;
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
};

// Function to sign up and login
export const signUpLogin = async ({
  memberId,
  memberPwd,
}: {
  memberId: string;
  memberPwd: string;
}): Promise<ResponseData> => {
  const data = { memberId, memberPwd };
  const response = await AuthAPI.post("/signup", data);
  return response.data;
};

export default AuthAPI;
