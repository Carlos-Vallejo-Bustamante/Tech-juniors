const router = require("express").Router();
const AxiosJuniors = require('../services/axios.services')
const axiosJob = new AxiosJuniors();
// const axios = require('axios');



/* GET Jobs page */
router.get("/", (req, res, next) => {
    axiosJob
        .getJobs()
        // .get('https://arbeitnow.com/api/job-board-api')
        .then((allJobs) => {
            console.log(allJobs.data);
            const myJobs = allJobs.data
            // const title = allJobs.data.data replace('(m/w/d) ', '')
            res.render('jobs/jobs', { myJobs })
        })
        .catch((error) => next(error));
});

router.get('/:slug', (req, res, next) => {
    axiosJob
        .getJob(req.params.slug)
        .then((job) => {
            console.log('PRUEBA ---->>>', job);
            res.render('jobs/details-job', { job })
        })
        .catch((err) => next(err));
})


module.exports = router;