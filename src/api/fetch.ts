import axios, { AxiosRequestConfig } from "axios";

axios.defaults.baseURL = "https://api.server5.terc.hu/recipe-book"
axios.defaults.headers.post["Content-Type"] = "application/json";

const makeRequest = async (config: AxiosRequestConfig): Promise<any> => {
    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        // Handle errors here if needed
        throw error;
    }
};

// General request function
export const request = (method: string, url: string, data: object = {}): Promise<any> => {
   
    const config: AxiosRequestConfig = {
        method,
        url,
        data,
        //add headers if needed
        headers: {}
    };

    return makeRequest(config); 
};

// GET request function
export const getRequest = (url: string): Promise<any> => {
    const config: AxiosRequestConfig = {
        method: "GET",
        url,
        //add headers if needed
        headers: {}
    };

    return makeRequest(config);
};
