
// TODO: 배포 or 개발 baseURL 자동변경 구현하기.
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
console.log('API_URL:', API_URL);