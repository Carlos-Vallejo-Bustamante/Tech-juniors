const axios = require('axios');

class AxiosJuniors {
    constructor() {
        this.axios = axios.create({
            baseURL: 'https://arbeitnow.com/api'
        });
    }
    getJobs() {
        return this.axios.get('/job-board-api').then((res) => res.data);
    }

    getJob(slug) {
        return this.axios.get(`/jobs/${slug}`).then((res) => res.data);
    }

    createJob({ name, weapon, occupation, debt }) {

        return this.axios
            .post('/Jobs', { name, weapon, occupation, debt })
            .then((res) => res.data);
    }

    editJob(id, body) {
        return this.axios.put(`/Jobs/${id}`, body).then((res) => res.data);
    }

    deleteJob(id) {
        return this.axios.delete(`/Jobs/${id}`).then((res) => res.data);
    }
}

module.exports = AxiosJuniors;
