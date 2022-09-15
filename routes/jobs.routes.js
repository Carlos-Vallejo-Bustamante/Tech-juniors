const router = require("express").Router();
const AxiosJuniors = require('../services/axios.services')
const axiosJob = new AxiosJuniors();
const JobModel = require('../models/Job.model');
const UserModel = require('../models/User.model')
const { roleValidation } = require('../middleware/roles.middleware');
const { USER, COMPANY } = require('../const/user.const')
// const { findByIdAndRemove } = require("../models/Job.model");



/* GET Jobs page */
router.get("/jobs", (req, res, next) => {
    let localJobs;

    JobModel
        .find()
        .then((jobs) => {
            localJobs = jobs
        })
        .then(() => {
            return axiosJob.getJobs()
        })
        .then((allJobs) => {
            const myJobs = allJobs.results
            res.render('jobs/jobs', { myJobs, localJobs })
        })
        .catch((error) => next(error));
});

router.get('/jobs/create', roleValidation(COMPANY), (req, res, next) => {
    if (req.session.user.role === 'COMPANY') {
        res.render('jobs/create-job')
    } else {
        res.render('auth/login', { errorMessage: 'You must be Company to access this page' })
    }
})

router.get('/jobs/:jobId', (req, res, next) => {
    axiosJob
        .getJob(req.params.jobId)
        .then((jobsApi) => {
            res.render('jobs/details-job', jobsApi)
        })
        .catch(() => {
            JobModel
                .findById(req.params.jobId)
                .then((jobsDb) => {

                    res.render('jobs/details-job', jobsDb)
                })
                .catch((err) => {
                    next(err)
                })
        });
})

router.get('/jobs/:jobId/edit', (req, res, render) => {
    JobModel
        .findById(req.params.jobId)
        .then((job) => {
            res.render('jobs/edit-job', job)
        })
        .catch((err) => {
            next(err)
        })
})

/* POST Jobs page */

router.post('/jobs/create', roleValidation(COMPANY), (req, res, next) => {
    const { jobTitle, employerName, locationName, salaryType, minimunSalary, maximunSalary, currency, fullTime, partTime, contractType, jobDescription, jobUrl } = req.body;
    console.log(req.body);
    JobModel
        .create({ jobTitle, employerName, locationName, salaryType, minimunSalary, maximunSalary, currency, fullTime, partTime, contractType, jobDescription, jobUrl })
        .then((job) => {
            res.redirect('/jobs')
        })
        .catch((error) => next(error));
})

router.post('/jobs/:jobId/delete', (req, res, next) => {
    JobModel
        .findByIdAndRemove(req.params.jobId)
        .then(() => {
            res.redirect('/jobs')
        })
        .catch((err) => {
            next(err)
        })
})

// Add favorite
router.post('/jobs/:jobId/favorite', (req, res, next) => {

    const jobFavorite = req.params.jobId
    const user = req.session.user
    console.log('QUIEN ERES TU', user)
    UserModel
        .findByIdAndUpdate(user, { $addToSet: { favorites: jobFavorite } }, { new: true })
        .then((currentUser) => {
            console.log(currentUser);
            res.redirect('/jobs')
        })
        .catch((err) => {
            next(err)
        })
})

router.post("/jobs/:jobId/edit", (req, res, next) => {
    const { jobTitle, employerName, locationName, salaryType, minimunSalary, maximunSalary, currency, fullTime, partTime, contractType, jobDescription, jobUrl } = req.body;
    JobModel
        .findByIdAndUpdate(req.params.jobId, { jobTitle, employerName, locationName, salaryType, minimunSalary, maximunSalary, currency, fullTime, partTime, contractType, jobDescription, jobUrl })
        .then((jobId) => res.redirect('/jobs'))
        .catch((err) => next(err))
})




module.exports = router;