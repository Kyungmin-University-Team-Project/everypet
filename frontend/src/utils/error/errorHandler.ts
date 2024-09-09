import {AxiosError} from 'axios';

export const handleAxiosError = (error: AxiosError) => {
    console.error('Error:', error);
    if (error.response) {
        console.error("Error:", error.response.data);
        console.error("Status Code:", error.response.status);
    } else if (error.request) {
        console.error("No response received:", error.request);
    } else {
        console.error("Error setting up request:", error.message);
    }
};
