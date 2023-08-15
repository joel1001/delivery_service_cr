import axios from 'axios';
import dotEnv from 'dotenv';
dotEnv.config();

export const getNeededTransaction = (url, token) => {
    console.log('entro a needed');
    const config = {
        headers: {
            'Authorization': token
        }
    }
    console.log('entro a needed', token);

    return new Promise((resolve, reject) => {
        try {
            axios.get(`${process.env.DELIVERY_SERVICE_BASE_UR}${url}`, config)
            .then((resp) => {
                console.log('resp',resp)
                resolve(resp.data);
            })
            .catch((error) => {
                resolve(error);
            });
        }
        catch(err) {
            reject(err);
        }
    })
}