const axios = require('axios');

class AxiosJuniors {
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

    getJob(jobId) {
        return this.axios.get(`/jobs/${jobId}`).then((res) => res.data);
    }

    // createJob({ jobTitle, employedName, locationName, salaryType, minimunSalary, maximunSalary, currency, fullTime, partTime, contractType, jobDescription, jobUrl }) {

    //     return this.axios
    //         .post('/jobs/create', { jobTitle, employedName, locationName, salaryType, minimunSalary, maximunSalary, currency, fullTime, partTime, contractType, jobDescription, jobUrl })
    //         .then((res) => res.data);
    // }

    // editJob(id, body) {
    //     return this.axios.put(`/jobs/${id}`, body).then((res) => res.data);
    // }

    // deleteJob(id) {
    //     return this.axios.delete(`/jobs/${id}`).then((res) => res.data);
    // }
}

module.exports = AxiosJuniors;
