import axios from 'axios';

interface ResponseData {
  access: string;
}

export const login = async ({
  memberId,
  memberPwd,
}: {
  memberId: string;
  memberPwd: string;
}): Promise<ResponseData> => {
  const data = { memberId, memberPwd };
  try {
    const response = await axios.post('/signin', data);
    const responseData: ResponseData = {
      access: response.headers.access,
    };

    // 서버 응답 데이터 확인
    console.log('Server Response Data:', responseData);

    // 토큰이 올바르게 추출되었는지 확인
    if (!responseData.access) {
      console.log('Invalid response data received from server');
    }

    return responseData; // 정상적인 경우 반환
  } catch (error) {
    console.error('Error in login:', error);
    throw error; // 오류가 발생한 경우 오류를 throw
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
  const response = await axios.post('http://localhost:8080/signup', data);
  return response.data;
};
