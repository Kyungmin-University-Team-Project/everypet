import axios, { AxiosInstance } from "axios";

const ACCESS_TOKEN = localStorage.getItem("access");

interface ResponseData {
  access: string;
}

export const createAuthApi = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      access: `${ACCESS_TOKEN}`,
    },
  });

  return instance;
};

const AuthAPI: AxiosInstance = createAuthApi("http://localhost:8080");

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
      access: response.headers.access,
    };

    // 서버 응답 데이터 확인
    console.log("Server Response Data:", responseData);

    // 토큰이 올바르게 추출되었는지 확인
    if (!responseData.access) {
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

/*export default AuthAPI;*/
