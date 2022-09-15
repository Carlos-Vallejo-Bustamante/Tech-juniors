const axios = require('axios');
const API_KEY = process.env.API_KEY

class JobsService {
    constructor() {
        this.axios = axios.create({
            baseURL: 'https://www.reed.co.uk/api/1.0',
            auth: {
                username: API_KEY,
                password: ''
            }
        });
    }
    getJobs() {
        return this.axios.get('/search?keywords=junior+web&locationName=UK').then((res) => res.data);
    }

    getJobsSearch(keywords, locationName) {
        return this.axios.get(`/search?keywords=junior ${keywords}&locationName=UK`).then((res) => res.data);
    }

    getJob(jobId) {
        return this.axios.get(`/jobs/${jobId}`).then((res) => res.data);
    }

}

module.exports = JobsService;
