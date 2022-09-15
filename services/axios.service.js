const axios = require('axios');

class JobsService {
    constructor() {
        this.axios = axios.create({
            baseURL: 'https://www.reed.co.uk/api/1.0',
            auth: {
                username: '33b0c34b-163f-4d0d-b895-320394c3e0fa',
                password: ''
            }
        });
    }
    getJobs() {
        return this.axios.get('/search').then((res) => res.data);
    }

    getJobsSearch(keywords, locationName) {
        return this.axios.get(`/search?keywords=junior ${keywords}&locationName=UK`).then((res) => res.data);
    }

    getJob(jobId) {
        return this.axios.get(`/jobs/${jobId}`).then((res) => res.data);
    }

}

module.exports = JobsService;
