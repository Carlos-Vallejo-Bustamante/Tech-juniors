const router = require("express").Router();
const AxiosJuniors = require('../services/axios.services')
const axiosJob = new AxiosJuniors();
const JobModel = require('../models/Job.model')



/* GET Jobs page */
router.get("/jobs", (req, res, next) => {
    axiosJob
        .getJobs()
        .then((allJobs) => {
            const myJobs = allJobs.results
            res.render('jobs/jobs', { myJobs })
        })
        .catch((error) => next(error));
});

router.get('/jobs/create', (req, res, next) => {
    res.render('jobs/create-job')
})

router.get('/jobs/:jobId', (req, res, next) => {
    axiosJob
        .getJob(req.params.jobId)
        .then((job) => {
            res.render('jobs/details-job', job)
        })
        .catch((err) => next(err));
})

/* POST Jobs page */

router.post('/jobs/create', (req, res, next) => {
    const { jobTitle, employedName, locationName, salaryType, minimunSalary, maximunSalary, currency, fullTime, partTime, contractType, jobDescription, jobUrl } = req.body;
    console.log(req.body);
    JobModel
        .create({ jobTitle, employedName, locationName, salaryType, minimunSalary, maximunSalary, currency, fullTime, partTime, contractType, jobDescription, jobUrl })
        .then((job) => {
            res.redirect('/jobs')
        })
        .catch((error) => next(error));
})



module.exports = router;