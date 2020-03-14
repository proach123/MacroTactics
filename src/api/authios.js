import axios from 'axios';

export const apiUrl = 'to be determined';

 const authios = () => {
    return axios.create({
        baseURL: apiUrl,
        headers: { 
            "Content-Type": "application/json",
            "authorization": localStorage.getItem("token")
        }
    });
};

export default authios