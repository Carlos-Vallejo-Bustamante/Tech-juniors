const axios = require('axios');

class AxiosPhotos {
    constructor() {
        this.axios = axios.create({
            baseURL: 'https://api.pexels.com/v1',
            headers: {
                Authorization: '563492ad6f9170000100000134ca8569b9804552b8ccd820b1babe36'
            }
        });
    }

    getPhoto(city) {
        return this.axios.get(`/search?query=${city}`).then((res) => res.data);
    }

}

module.exports = AxiosPhotos;